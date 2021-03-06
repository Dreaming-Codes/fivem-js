import { Blip } from './Blip';
import { Vector3 } from './utils';

export class Pickup {
  private _addedBlip: Blip;

  private readonly _handle: number;

  constructor(handle: number) {
    this._handle = handle;
  }

  public get Handle(): number {
    return this._handle;
  }

  public get Position(): Vector3 {
    const coords = GetPickupCoords(this._handle);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  public get IsCollected(): boolean {
    return !!HasPickupBeenCollected(this._handle);
  }

  public get AddedBlip(): Blip {
    return this._addedBlip && this._addedBlip.exists() ? this._addedBlip : null;
  }

  public addBlip(): Blip {
    return new Blip(AddBlipForPickup(this._handle));
  }

  public set Hidden(value: boolean) {
    HidePickup(this._handle, value);
  }

  public delete(): void {
    RemovePickup(this._handle);
  }

  public exists(): boolean {
    return !!DoesPickupExist(this._handle);
  }

  public objectExists(): boolean {
    return !!DoesPickupObjectExist(this._handle);
  }
}
