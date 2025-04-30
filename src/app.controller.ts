import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('sample')
  async sample() {
    // create
    // 모델에 해당되는 객체 생성 - 저장하지 않음
    // const user1 = this.userRepository.create({
    //   email: 'test@example.com',
    // });

    // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@example.com',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'testtest@example.com',
    // });

    // 삭제하기
    // await this.userRepository.delete(101);

    // 값을 증가시킴
    // await this.userRepository.increment({ id: 11 }, 'count', 50);

    // 값을 감소시킴
    // await this.userRepository.decrement({ id: 1 }, 'count', 1);

    // 개수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // 합산
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(20),
    // });

    // 평균
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(20),
    // });

    // 최소값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(20),
    // });

    // 최대값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(20),
    // });

    // find / findOne
    // const users = await this.userRepository.find({});
    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
      order: {
        id: 'ASC',
      },
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@gmail.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 필터링할 조건을 입력
      where: {
        // 조건이 아닌 경우
        // id: Not(1),
        // 조건보다 적은 경우
        // id: LessThan(30),
        // 조건보다 적거나 같은 경우
        // id: LessThanOrEqual(30),
        // 조건보다 많은 경우
        // id: MoreThan(30),
        // 조건보다 많거나 같은 경우
        // id: MoreThanOrEqual(30),
        // 같은 경우
        // id: Equal(30),
        // 유사값
        // email: Like('%GMAIL%'),
        // 대문자, 소문자 구별하지 않는 유사값
        // email: ILike('%GMAIL%'),
        // 사이값
        // id: Between(10, 20),
        // 해당되는 여러 개의 값
        // id: In([1, 3, 7, 10, 99]),
        // null인 경우
        // id: IsNull(),
      },

      // 어떤 속성을 선택할지
      // select를 정의하지 않으면(select: {}) 모든 속성을 가져온다
      // select를 정의하면 정의된 속성만 가져오게 된다
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      // 관계를 가져오는 법
      // relation을 가져오면 select, where 등에서도 사용 가능
      // relations: {
      //   profile: true,
      // },
      // 오름차, 내림차순 정렬
      // ASC -> 오름차
      // DESC -> 내림차
      order: {
        id: 'ASC',
      },
      // 정렬 후 처음 몇 개를 제외할지 선택(기본값은 0)
      // skip: 0,
      // 정렬 후 처음 몇 개를 가져올지 선택(기본값은 0)
      // take: 2,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.save({ ...user, email: user.email + '0' });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@example.com',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@example.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'TypeOrm Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'JavaScript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
