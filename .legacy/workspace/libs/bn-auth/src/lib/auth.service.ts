import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { BoatnetUser, BoatnetUserToken } from './bn-auth.models';
import * as cryptoJS from 'crypto-js';

import * as utils from 'minimalistic-crypto-utils';
import * as jsonwebtoken from 'jsonwebtoken';
import * as pemjwk from 'pem-jwk';

@Injectable()
export class AuthServiceConfig {
  /**
   * Note that this will be read from dbConfig.json. See app.module.ts
   */
  authUrl = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected authUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() authConfig: AuthServiceConfig
  ) {
    const defaultConfig = new AuthServiceConfig();
    this.authUrl = authConfig ? authConfig.authUrl : defaultConfig.authUrl;
    console.log('[AuthService] Auth Base URL', this.authUrl);
  }

  public authedUserToken: BoatnetUserToken;

  /**
   * TODO: Better username validation, maybe check for email address if we use email
   * @param username username for validation against db
   */
  public validateUsername(username: string) {
    return new Promise((resolve, reject) => {
      if (username.length > 3) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  getPubKey(): Observable<string> {
    /**
     * Returns PEM key for JWT signature verification
     */
    return this.http.get<any>(this.authUrl + '/api/pubkey').pipe(
      map(result => {
        const jwkKeyLoaded = result.keys[0]; // assuming our key is first
        // TODO If we add multiple keys, we would use 'kid' property for matching
        const pemKey = pemjwk.jwk2pem(jwkKeyLoaded);
        localStorage.setItem('jwk-pub-key', JSON.stringify(jwkKeyLoaded));
        return pemKey;
      }),
      catchError(err => {
        console.log('Error in getPubKey', err);
        const jwkKey = localStorage.getItem('jwk-pub-key');
        if (jwkKey) {
          const storedJWK = JSON.parse(jwkKey);
          console.log('PEM retrieved from localStorage.');
          return pemjwk.jwk2pem(storedJWK);
        } else {
          throw new Error(
            'Public key not available. Internet connection required.'
          );
        }
      })
    );
  }

  private storeUserToken(userToken: BoatnetUserToken) {
    let usersMap = new Map(JSON.parse(localStorage.getItem('bn-users')));
    console.log(usersMap);
    if (!usersMap) {
      usersMap = new Map();
    }
    usersMap.set(userToken.sub.username, userToken);
    console.log('Stored', usersMap);
    localStorage.setItem('bn-users', JSON.stringify([...usersMap]));
  }

  private getStoredUserToken(username: string): BoatnetUserToken {
    const storedUsers = new Map(JSON.parse(localStorage.getItem('bn-users')));
    if (storedUsers && storedUsers.has(username)) {
      return <BoatnetUserToken>storedUsers.get(username);
    } else {
      return undefined;
    }
  }

  private loginKeyVerify(
    username: string,
    password: string,
    pubKey: string
  ): Observable<BoatnetUserToken> {
    return this.http
      .post<any>(this.authUrl + '/api/login', {
        username: username,
        password: password
      })
      .pipe(
        map(result => {
          const verified = jsonwebtoken.verify(result.token, pubKey);
          this.authedUserToken = verified;
          this.authedUserToken.sub = JSON.parse(verified.sub); // decode sub
          this.storeUserToken(this.authedUserToken);
          return this.authedUserToken;
        }),
        catchError(err => {
          if (err.status === 401) {
            return throwError('Invalid username or password.');
          }
          console.log('Getting stored user, because of error:', err);
          const storedUser = this.getStoredUserToken(username);
          if (!storedUser) {
            return throwError(
              'Unable to log in using cached credentials. Internet connection required.'
            );
          } else {
            const isStoredPwOK = this.checkPassword(storedUser, password);
            if (!isStoredPwOK) {
              return throwError('Invalid offline username or password.');
            } else {
              this.authedUserToken = storedUser;
              return of(this.authedUserToken);
            }
          }
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  private checkPassword(
    storedUser: BoatnetUserToken,
    password: string
  ): boolean {
    const pwVals = storedUser.sub.hashedPW.split('|');
    if (pwVals.length !== 2) {
      throw new Error('Error parsing PW string.');
    }

    const salt = pwVals[0];
    const hashedPW = pwVals[1];

    const hashedPW_SHA = cryptoJS.SHA512(salt + password).toString(); // For FIPS compliance, need SHA-512 layer
    const verified = hashedPW === hashedPW_SHA;
    return verified;
  }

  login(user: string, pw: string): Observable<BoatnetUser> {
    /**
     * Login, and use cached credentials if unable to connect to login server.
     */
    return this.getPubKey().pipe(
      // flattens Observable to its return value, exhaustMap only allows 1 login req. at a time
      exhaustMap(key => this.loginKeyVerify(user, pw, key)),
      map(result => {
        return result.sub; // pull user out of JWT
      }),
      catchError(err => {
        let errMsg = err;
        if (err.error) {
          errMsg = err.error.message;
        }
        return throwError(errMsg);
      })
    );
  }

  logout() {
    console.log('[AuthService] TODO: Logout functionality.');
    this.authedUserToken = undefined;
    // TODO remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
  }

  getUserObs(): Observable<BoatnetUser> {
    return of(this.authedUserToken ? this.authedUserToken.sub : undefined);
  }

  public isLoggedIn(): boolean {
    return !!this.authedUserToken;
  }

  public getCurrentUser(): BoatnetUser {
    // TODO: Observable only?
    return this.authedUserToken ? this.authedUserToken.sub : undefined;
  }

  public getCurrentUsername(): string {
    // TODO
    const user = 'test'; // this.getCurrentUser();
    return user;
  }

  private storePubKey(jwkKey) {
    localStorage.setItem('jwk-pub-key', JSON.stringify(jwkKey));
  }

  private getCouchUserDBName(username): string {
    /**
     * Converts username to couchdb format
     */
    if (username) {
      const nameArr = utils.toArray(username);
      return 'userdb-' + utils.toHex(nameArr);
    } else {
      throw new Error('Invalid username');
    }
  }
}
