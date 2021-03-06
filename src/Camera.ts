import { CameraShake } from './enums';
import { Entity, PedBone } from './models';
import { Vector3 } from './utils';

export class Camera {
  private readonly _shakeNames: string[] = [
    'HAND_SHAKE',
    'SMALL_EXPLOSION_SHAKE',
    'MEDIUM_EXPLOSION_SHAKE',
    'LARGE_EXPLOSION_SHAKE',
    'JOLT_SHAKE',
    'VIBRATE_SHAKE',
    'ROAD_VIBRATION_SHAKE',
    'DRUNK_SHAKE',
    'SKY_DIVING_SHAKE',
    'FAMILY5_DRUG_TRIP_SHAKE',
    'DEATH_FAIL_IN_EFFECT_SHAKE',
  ];

  private _handle: number;

  constructor(handle: number) {
    this._handle = handle;
  }

  public get Handle(): number {
    return this._handle;
  }

  public get IsActive(): boolean {
    return !!IsCamActive(this._handle);
  }

  public set IsActive(active: boolean) {
    SetCamActive(this._handle, active);
  }

  public get Position(): Vector3 {
    const pos = GetCamCoord(this._handle);
    return new Vector3(pos[0], pos[1], pos[2]);
  }

  public set Position(position: Vector3) {
    SetCamCoord(this._handle, position.x, position.y, position.z);
  }

  public get Rotation(): Vector3 {
    const rot = GetCamRot(this._handle, 2);
    return new Vector3(rot[0], rot[1], rot[2]);
  }

  public set Rotation(rotation: Vector3) {
    SetCamRot(this._handle, rotation.x, rotation.y, rotation.z, 2);
  }

  // public get Matrix() : Matrix {}

  /**
   * Gets the direction the camera is facing. Same as ForwardVector
   */
  public get Direction(): Vector3 {
    return this.ForwardVector;
  }

  public set Direction(direction: Vector3) {
    const dir = direction.normalize;

    const vec1 = new Vector3(dir.x, dir.y, 0);
    const vec2 = new Vector3(dir.z, vec1.distanceSquared(vec1), 0);
    const vec3 = vec2.normalize;

    this.Rotation = new Vector3(
      Math.atan2(vec3.x, vec3.y) * 57.295779513082323,
      this.Rotation.y,
      Math.atan2(dir.x, dir.y) * -57.295779513082323,
    );
  }

  //   public get UpVector() : Vector3 {
  //       return Matrix.Up;
  //   }

  public get ForwardVector(): Vector3 {
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

  //   public get RightVector() : Vector3 {
  //       return Matrix.Right;
  //   }
  // public Vector3 GetOffsetPosition(Vector3 offset) {
  //     return Vector3.TransformCoordinate(offset, Matrix);
  // }

  // public Vector3 GetPositionOffset(Vector3 worldCoords) {
  //     return Vector3.TransformCoordinate(worldCoords, Matrix.Invert(Matrix));
  // }

  public get FieldOfView(): number {
    return GetCamFov(this._handle);
  }

  public set FieldOfView(fieldOfView: number) {
    SetCamFov(this._handle, fieldOfView);
  }

  public get NearClip(): number {
    return GetCamNearClip(this._handle);
  }

  public set NearClip(nearClip: number) {
    SetCamNearClip(this._handle, nearClip);
  }

  public get FarClip(): number {
    return GetCamFarClip(this._handle);
  }

  public set FarClip(farClip: number) {
    SetCamFarClip(this._handle, farClip);
  }

  public set NearDepthOfField(nearDepthOfField: number) {
    SetCamNearDof(this._handle, nearDepthOfField);
  }

  public get FarDepthOfField(): number {
    return GetCamFarDof(this._handle);
  }

  public set FarDepthOfField(farDepthOfField: number) {
    SetCamFarDof(this._handle, farDepthOfField);
  }

  public set DepthOfFieldStrength(strength: number) {
    SetCamDofStrength(this._handle, strength);
  }

  public set MotionBlurStrength(strength: number) {
    SetCamMotionBlurStrength(this._handle, strength);
  }

  public shake(shakeType: CameraShake, amplitude: number): void {
    ShakeCam(this._handle, this._shakeNames[Number(shakeType)], amplitude);
  }

  public stopShaking(): void {
    StopCamShaking(this._handle, true);
  }

  public get IsShaking(): boolean {
    return !!IsCamShaking(this._handle);
  }

  public set ShakeAmplitude(amplitude: number) {
    SetCamShakeAmplitude(this._handle, amplitude);
  }

  public pointAt(target: Entity | PedBone | Vector3, offset: Vector3 = new Vector3(0, 0, 0)): void {
    if (target instanceof Entity) {
      PointCamAtEntity(this._handle, target.Handle, offset.x, offset.y, offset.z, true);
    } else if (target instanceof PedBone) {
      PointCamAtPedBone(
        this._handle,
        target.Owner.Handle,
        target.Index,
        offset.x,
        offset.y,
        offset.z,
        true,
      );
    } else {
      PointCamAtCoord(this._handle, target.x, target.y, target.z);
    }
  }

  public stopPointing(): void {
    StopCamPointing(this._handle);
  }

  public interpTo(
    to: Camera,
    duration: number,
    easePosition: boolean,
    easeRotation: boolean,
  ): void {
    SetCamActiveWithInterp(
      to._handle,
      this._handle,
      duration,
      Number(easePosition),
      Number(easeRotation),
    );
  }

  public get IsInterpolating(): boolean {
    return !!IsCamInterpolating(this._handle);
  }

  public attachTo(pedBone: PedBone, offset: Vector3): void;
  public attachTo(entity: Entity, offset: Vector3, isRelative?: boolean): void;
  public attachTo(object: Entity | PedBone, offset: Vector3, isRelative = true): void {
    if (object instanceof Entity) {
      AttachCamToEntity(this._handle, object.Handle, offset.x, offset.y, offset.z, isRelative);
    } else if (object instanceof PedBone) {
      AttachCamToPedBone(
        this._handle,
        object.Owner.Handle,
        object.Index,
        offset.x,
        offset.y,
        offset.z,
        true,
      );
    }
  }

  public detach(): void {
    DetachCam(this._handle);
  }

  public delete(): void {
    DestroyCam(this._handle, false);
  }

  public exists(): boolean {
    return !!DoesCamExist(this._handle);
  }
}
