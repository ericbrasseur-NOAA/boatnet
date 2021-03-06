import { BoatnetBase } from '../interface/boatnet-base';
import { BoatnetDate } from '../types/boatnet-date';

export class TestModel implements BoatnetBase {
  id: string;
  type: 'vessel';
  created_by: string;
  created_date: BoatnetDate;
  vessel_name: string;
  uscg_num: string;
  state_reg: string;
}
