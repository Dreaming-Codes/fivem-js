import { Camera } from './Camera';
import { CameraShake } from './enums/CameraShake';
import { Vector3 } from './utils';

/**
 * The current rendering gameplay camera
 */
export abstract class GameplayCamera {
  /**
   * Get the world position of gameplay camera.
   */
  public static get Position(): Vector3 {
    const coords = GetGameplayCamCoords();
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  /**
   * Get the rotation of gameplay camera.
   */
  public static get Rotation(): Vector3 {
    const rot = GetGameplayCamRot(2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  /**
   * Get the forward vector of gameplay camera.
   */
  public static get ForwardVector(): Vector3 {
    const rotation = Vector3.multiply(this.Rotation, Math.PI / 180);
    const normalized = Vector3.normalize(
      new Vector3(
        -Math.sin(rotation.z) * Math.abs(Math.cos(rotation.x)),
        Math.cos(rotation.z) * Math.abs(Math.cos(rotation.x)),
        Math.sin(rotation.x),
      ),
    );
    return new Vector3(normalized.x, normalized.y, normalized.z);
  }

  /**
   * Get the pitch of the gameplay camera relative to player.
   */
  public static get RelativePitch(): number {
    return GetGameplayCamRelativePitch();
  }

  /**
   * Set gameplay camera pitch relative to player.
   */
  public static set RelativePitch(pitch: number) {
    SetGameplayCamRelativePitch(pitch, 1);
  }

  /**
   * Get heading of gameplay camera.
   */
  public static get RelativeHeading(): number {
    return GetGameplayCamRelativeHeading();
  }

  /**
   * Get heading of gameplay camera.
   */
  public static set RelativeHeading(heading: number) {
    SetGameplayCamRelativeHeading(heading);
  }

  /**
   * Clamps the yaw of the gameplay camera.
   *
   * @param min The minimum yaw value.
   * @param max The maximum yaw value.
   */
  public static clampYaw(min: number, max: number): void {
    ClampGameplayCamYaw(min, max);
  }

  /**
   * Clamps the pitch of the gameplay camera.
   *
   * @param min The minimum pitch value.
   * @param max The maximum pitch value.
   */
  public static clampPitch(min: number, max: number): void {
    ClampGameplayCamPitch(min, max);
  }

  /**
   * Gets zoom of the gameplay camera.
   */
  public static get Zoom(): number {
    return GetGameplayCamZoom();
  }

  /**
   * Gets field of view of the gameplay camera.
   */
  public static get FieldOfView(): number {
    return GetGameplayCamFov();
  }

  /**
   * Gets a value indicating whether the gameplay camera is rendering.
   *
   * @returns true if the gameplay camera is rendering; otherwise, false.
   */
  public static get IsRendering(): boolean {
    return !!IsGameplayCamRendering();
  }

  /**
   * Gets a value indicating whether the aiming camera is rendering.
   *
   * @returns true if the aiming camera is rendering; otherwise, false.
   */
  public static get IsAimCamActive(): boolean {
    return !!IsAimCamActive();
  }

  /**
   * Gets a value indicating whether the first person aiming camera is rendering.
   *
   * @returns true if the first person aiming camera is rendering; otherwise, false.
   */
  public static get IsFirstPersonAimCamActive(): boolean {
    return !!IsFirstPersonAimCamActive();
  }

  /**
   * Gets a value indicating whether the gameplay camera is looking behind.
   *
   * @returns true if the gameplay camera is looking behind; otherwise, false.
   */
  public static get IsLookingBehind(): boolean {
    return !!IsGameplayCamLookingBehind();
  }

  /**
   * Shakes the gameplay camera.
   *
   * @param shakeType Type of the shake to apply.
   * @param amplitude The amplitude of the shaking.
   */
  public static shake(shakeType: CameraShake, amplitude: number): void {
    ShakeGameplayCam(Camera.shakeNames[Number(shakeType)], amplitude);
  }

  /**
   * Stops shaking the gameplay camera.
   */
  public static stopShaking(): void {
    StopGameplayCamShaking(true);
  }

  /**
   * Gets a value indicating whether the gameplay camera is shaking.
   *
   * @returns true if the gameplay camera is shaking; otherwise, false.
   */
  public static get IsShaking(): boolean {
    return !!IsGameplayCamShaking();
  }

  /**
   * Sets the shake amplitude for the gameplay camera.
   */
  public static set ShakeAmplitude(value: number) {
    SetGameplayCamShakeAmplitude(value);
  }
}
