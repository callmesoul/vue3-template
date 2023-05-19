import mitt from 'mitt'
export const Mitt = new mitt()

export enum MittEvent {
  AddBuzz = 'AddBuzz',
  UpdateBuzz = 'UpdateBuzz',
  RemoveBuzz = 'RemoveBuzz',
  FollowUser = 'FollowUser',
  SellNFT = 'SellNFT',
  ChangeLoginUser = 'ChangeLoginUser',
}
