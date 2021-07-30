import { Color, Vector3 } from '..';
import { ParachuteTint } from '../enums';
import { Model } from '../Model';
import { Ped } from './';
import { Entity } from './Entity';
import { Vehicle } from './Vehicle';

export class Player {
  public static fromServerId(serverId: number): Player {
    const handle = GetPlayerFromServerId(serverId);
    return handle !== -1 ? new Player(handle) : null;
  }

  protected handle: number;

  private _ped: Ped;

  constructor(handle: number) {
    this.handle = handle;
  }

  public get Handle(): number {
    return this.handle;
  }

  public get ServerId(): number {
    return GetPlayerServerId(this.handle);
  }

  /**
   * Gets the ped this player is controlling.
   */
  public get Character(): Ped {
    const handle = GetPlayerPed(this.handle);

    if (typeof this._ped === 'undefined' || handle !== this._ped.Handle) {
      this._ped = new Ped(handle);
    }
    return this._ped;
  }

  /**
   * Gets the name of this player.
   */
  public get Name(): string {
    return GetPlayerName(this.handle);
  }

  /**
   * Gets a value indicating whether this player is active.
   *
   * @returns true if this player is active; otherwise, false.
   */
  public get IsActive(): boolean {
    return !!NetworkIsPlayerActive(this.handle);
  }

  /**
   * Gets the wanted level for this player.
   */
  public get WantedLevel(): number {
    return GetPlayerWantedLevel(this.handle);
  }

  /**
   * Sets the wanted level for this player.
   */
  public set WantedLevel(value: number) {
    SetPlayerWantedLevel(this.handle, value, false);
  }

  /**
   * Gets the wanted center position for this player.
   *
   * @returns The place in world coords where the police think this player is.
   */
  public get WantedCenterPosition(): Vector3 {
    const [x, y, z] = GetPlayerWantedCentrePosition(this.handle);
    return new Vector3(x, y, z);
  }

  /**
   * Sets the wanted center position for this player.
   */
  public set WantedCenterPosition(value: Vector3) {
    (SetPlayerWantedCentrePosition as any)(this.handle, value.x, value.y, value.z);
  }

  /**
   * Gets the maximum amount of armor this player can carry.
   */
  public get MaxArmor(): number {
    return GetPlayerMaxArmour(this.handle);
  }

  /**
   * Sets the maximum amount of armor this player can carry.
   */
  public set MaxArmor(value: number) {
    SetPlayerMaxArmour(this.handle, value);
  }

  /**
   * Gets the primary parachute tint for this player.
   */
  public get PrimaryParachuteTint(): ParachuteTint {
    return (GetPlayerParachuteTintIndex(this.handle, undefined) as unknown) as ParachuteTint;
  }

  /**
   * Sets the primary parachute tint for this player.
   */
  public set PrimaryParachuteTint(value: ParachuteTint) {
    SetPlayerParachuteTintIndex(this.handle, Number(value));
  }

  /**
   * Gets the reserve parachute tint for this player.
   */
  public get ReserveParachuteTint(): ParachuteTint {
    return (GetPlayerReserveParachuteTintIndex(this.handle, undefined) as unknown) as ParachuteTint;
  }

  /**
   * Sets the reserve parachute tint for this player.
   */
  public set ReserveParachuteTint(value: ParachuteTint) {
    SetPlayerReserveParachuteTintIndex(this.handle, Number(value));
  }

  /**
   * Sets a value indicating whether this player can leave a parachute smoke trail.
   */
  public set CanLeaveParachuteSmokeTrail(value: boolean) {
    SetPlayerCanLeaveParachuteSmokeTrail(this.handle, value);
  }

  /**
   * Gets the color of the parachute smoke trail for this player.
   *
   * @returns The color of the parachute smoke trail for this player.
   */
  public get ParachuteSmokeTrailColor(): Color {
    const [r, g, b] = GetPlayerParachuteSmokeTrailColor(this.handle);
    return Color.fromRgb(r, g, b);
  }

  /**
   * Sets the color of the parachute smoke trail for this player.
   */
  public set ParachuteSmokeTrailColor(color: Color) {
    SetPlayerParachuteSmokeTrailColor(this.handle, color.r, color.g, color.b);
  }

  /**
   * Gets a value indicating whether this player is alive.
   *
   * @returns true if this player is alive; otherwise, false.
   */
  public get IsAlive(): boolean {
    return !this.IsDead;
  }

  /**
   * Gets a value indicating whether this player is dead.
   *
   * @returns true if this player is dead; otherwise, false.
   */
  public get IsDead(): boolean {
    return !!IsPlayerDead(this.handle);
  }

  /**
   * Gets a value indicating whether this player is aiming.
   *
   * @returns true if this player is aiming; otherwise, false.
   */
  public get IsAiming(): boolean {
    return !!IsPlayerFreeAiming(this.handle);
  }

  /**
   * Gets a value indicating whether this player is climbing.
   *
   * @returns true if this player is climbing; otherwise, false.
   */
  public get IsClimbing(): boolean {
    return !!IsPlayerClimbing(this.handle);
  }

  /**
   * Gets a value indicating whether this player is riding a train.
   *
   * @returns true if this player is riding a train; otherwise, false.
   */
  public get IsRidingTrain(): boolean {
    return !!IsPlayerRidingTrain(this.handle);
  }

  /**
   * Gets a value indicating whether this player is pressing horn.
   *
   * @returns true if this player is pressing horn; otherwise, false.
   */
  public get IsPressingHorn(): boolean {
    return !!IsPlayerPressingHorn(this.handle);
  }

  /**
   * Gets a value indicating whether this player is playing.
   *
   * @returns true if this player is playing; otherwise, false.
   */
  public get IsPlaying(): boolean {
    return !!IsPlayerPlaying(this.handle);
  }

  /**
   * Gets a value indicating whether this player is invincible.
   *
   * @returns true if this player is invincible; otherwise, false.
   */
  public get IsInvincible(): boolean {
    return !!GetPlayerInvincible(this.handle);
  }

  /**
   * Sets a value indicating whether this player is invincible.
   */
  public set IsInvincible(value: boolean) {
    SetPlayerInvincible(this.handle, value);
  }

  /**
   * Gets a value indicating whether this player is concealed.
   *
   * @returns true if this player is concealed; otherwise, false.
   */
  public get IsConcealed(): boolean {
    return !!NetworkIsPlayerConcealed(this.handle);
  }

  /**
   * Sets a value indicating whether this player is concealed.
   */
  public set IsConcealed(value: boolean) {
    NetworkConcealPlayer(this.handle, value, value);
  }

  /**
   * Sets a value indicating whether this player is ignored by the police.
   */
  public set IgnoredByPolice(value: boolean) {
    SetPoliceIgnorePlayer(this.handle, value);
  }

  /**
   * Sets a value indicating whether this player is ignored by everyone.
   */
  public set IgnoredByEveryone(value: boolean) {
    SetEveryoneIgnorePlayer(this.handle, value);
  }

  /**
   * Sets a value indicating whether cops will be dispatched for this player.
   */
  public set DispatchCops(value: boolean) {
    SetDispatchCopsForPlayer(this.handle, value);
  }

  /**
   * Sets a value indicating whether this player can use cover.
   */
  public set CanUseCover(value: boolean) {
    SetPlayerCanUseCover(this.handle, value);
  }

  /**
   * Gets a value indicating whether this player can start a mission.
   *
   * @returns true if this player can start a mission; otherwise, false.
   */
  public get CanStartMission(): boolean {
    return !!CanPlayerStartMission(this.handle);
  }

  /**
   * Sets a value indicating whether this player can control ragdoll.
   */
  public set CanControlRagdoll(value: boolean) {
    GivePlayerRagdollControl(this.handle, value);
  }

  /**
   * Sets a value indicating whether this player can control its ped.
   *
   * @returns true if this player can control its ped; otherwise, false.
   */
  public get CanControlCharacter(): boolean {
    return !!IsPlayerControlOn(this.handle);
  }

  /**
   * Sets a value indicating whether this player can control its ped.
   */
  public set CanControlCharacter(value: boolean) {
    SetPlayerControl(this.handle, value, 0);
  }

  /**
   * Attempts to change the model of this player.
   *
   * @param model The model to change this player to.
   * @returns true if the change was successful; otherwise, false.
   */
  public async changeModel(model: Model): Promise<boolean> {
    if (!model.IsInCdImage || !model.IsPed || !(await model.request())) {
      return false;
    }

    SetPlayerModel(this.handle, model.Hash);

    model.markAsNoLongerNeeded();

    return true;
  }

  /**
   * Gets how long this player can remain sprinting for.
   */
  public get RemainingSprintTime(): number {
    return GetPlayerSprintTimeRemaining(this.handle);
  }

  /**
   * Gets how long this player can stay underwater before they start losing health.
   */
  public get RemainingUnderwaterTime(): number {
    return GetPlayerUnderwaterTimeRemaining(this.handle);
  }

  /**
   * Gets a value indicating whether this player is using their special ability.
   *
   * @returns true if this player is using their special ability; otherwise, false.
   */
  public get IsSpecialAbilityActive(): boolean {
    return !!IsSpecialAbilityActive(this.handle);
  }

  /**
   * Gets a value indicating whether this player can use their special ability.
   *
   * @returns true if this player can use their special ability; otherwise, false.
   */
  public get IsSpecialAbilityEnabled(): boolean {
    return !!IsSpecialAbilityEnabled(this.handle);
  }

  /**
   * Sets a value indicating whether this player can use their special ability.
   */
  public set IsSpecialAbilityEnabled(value: boolean) {
    EnableSpecialAbility(this.handle, value);
  }

  /**
   * Charges the special ability for this player.
   *
   * @param absoluteAmount The absolute amount.
   */
  public chargeSpecialAbilityAbsolute(absoluteAmount: number): void {
    SpecialAbilityChargeAbsolute(this.handle, absoluteAmount, true);
  }

  /**
   * Charges the special ability for this player.
   *
   * @param normalizedRatio The amount between 0 and 1.
   */
  public chargeSpecialAbilityNormalized(normalizedRatio: number): void {
    SpecialAbilityChargeNormalized(this.handle, normalizedRatio, true);
  }

  /**
   * Refills the special ability for this player.
   */
  public refillSpecialAbility(): void {
    SpecialAbilityFillMeter(this.handle, true);
  }

  /**
   * Deplates the special ability for this player.
   */
  public deplateSpecialAbility(): void {
    SpecialAbilityDepleteMeter(this.handle, true);
  }

  /**
   * Gets a value indicating whether this player is targetting the specified entity.
   *
   * @param entity The entity to check.
   * @returns true if this player is targetting the specified entity; otherwise, false.
   */
  public isTargettingEntity(entity: Entity): boolean {
    return !!IsPlayerFreeAimingAtEntity(this.handle, entity.Handle);
  }

  /**
   * Gets a value indicating whether this player is targetting anything.
   *
   * @returns true if this player is targetting anything; otherwise, false.
   */
  public get IsTargettingAnything(): boolean {
    return !!IsPlayerTargettingAnything(this.handle);
  }

  /**
   * Sets a value indicating whether the player is forced to aim.
   *
   * @param value true to make the player always be aiming; otherwise, false.
   */
  public set ForcedAim(value: boolean) {
    SetPlayerForcedAim(this.handle, value);
  }

  /**
   * Prevents this player firing this frame.
   */
  public disableFiringThisFrame(): void {
    DisablePlayerFiring(this.handle, false);
  }

  /**
   * Sets the run speed multiplier for this player this frame.
   *
   * @param mult The factor - min: 0, default: 1, max: 1.499.
   */
  public setRunSpeedMultThisFrame(mult: number): void {
    if (mult > 1.499) {
      mult = 1.499;
    }
    SetRunSprintMultiplierForPlayer(this.handle, mult);
  }

  /**
   * Sets the swim speed multiplier for this player this frame.
   *
   * @param mult The factor - min: 0, default: 1, max: 1.499.
   */
  public setSwimSpeedMultThisFrame(mult: number): void {
    if (mult > 1.499) {
      mult = 1.499;
    }
    SetSwimMultiplierForPlayer(this.handle, mult);
  }

  /**
   * Makes this player shoot fire bullets this frame.
   */
  public setFireAmmoThisFrame(): void {
    SetFireAmmoThisFrame(this.handle);
  }

  /**
   * Makes this player shoot explosive bullets this frame.
   */
  public setExplosiveAmmoThisFrame(): void {
    SetExplosiveAmmoThisFrame(this.handle);
  }

  /**
   * Makes this player have an explosive melee attack this frame.
   */
  public setExplosiveMeleeThisFrame(): void {
    SetExplosiveMeleeThisFrame(this.handle);
  }

  /**
   * Lets this player jump really high this frame.
   */
  public setSuperJumpThisFrame(): void {
    SetSuperJumpThisFrame(this.handle);
  }

  /**
   * Blocks this player from entering any vehicle.
   */
  public setMayNotEnterAnyVehicle(): void {
    SetPlayerMayNotEnterAnyVehicle(this.handle);
  }

  /**
   * Only lets this player enter a specific vehicle.
   *
   * @param vehicle The vehicle this player is allowed to enter.
   */
  public setMayOnlyEnterThisVehicle(vehicle: Vehicle): void {
    SetPlayerMayOnlyEnterThisVehicle(this.handle, vehicle.Handle);
  }
}
