import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // @PrimaryGeneratedColumn() : 자동으로 생성되는 PK
  // @PrimaryColumn() : 직접 입력되는 PK

  // @PrimaryGeneratedColumn() -> 1부터 증가하는 값
  // 'uuid' 사용 시 f6002553-8fab-46d8-972d-1c243391f72e와 같은 형식의 PK 자동 생성
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // 데이터가 생성되는 날짜와 시간이 자동으로 입력됨
  @CreateDateColumn()
  createdAt: Date;

  // 데이터가 업데이트 되는 날짜와 시간이 자동으로 입력됨
  @UpdateDateColumn()
  updatedAt: Date;

  // 1에서 시작, 데이터가 업데이트 될 때마다 1씩 증가
  // => save() 함수가 몇 번 호출되었는지 기억
  @VersionColumn()
  version: number;

  // 'increment' => @PrimaryGeneratedColumn()과 같은 기능
  // 'uuid' => @PrimaryGeneratedColumn('uuid)와 같은 기능
  @Column()
  @Generated('increment')
  additionalId: number;
}
