export class SkinEntity {
  uuid: string;
  full_name: string;
  pattern_name: string;
  image: string;
  rarity: string;
  weapon: string;

  constructor(partial: Partial<SkinEntity>) {
    Object.assign(this, partial);
  }
}
