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

  @Column({
    // 데이터베이스에서 인지하는 칼럼 타입
    // 자동으로 유추됨
    type: 'varchar',
    // 데이터베이스 칼럼 이름
    name: '_title',
    // 값의 길이
    // 입력할 수 있는 글자의 길이가 300
    // 지정할 수 있는 타입이 정해져 있음 (text X varchar O)
    length: 300,
    // null이 가능한지
    nullable: true,
    // false면 처음 저장할 때만 값 지정 가능
    // 이후에는 값 변경 불가능 (typeorm 0.3.20 이상에서 미작동)
    update: true,
    // 기본값이 true
    // find(), findOne() 등을 실행할 때 기본으로 값을 불러올지 결정
    // false 시 title 표시 X
    select: false,
    // 아무 것도 입력하지 않았을 때의 기본값
    default: 'Default Title',
    // 칼럼 중에서 유일한 값이 되어야 하는지 (기본값: false)
    unique: true,
  })
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
