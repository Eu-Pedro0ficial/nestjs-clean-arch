import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService; // SUT - Convernção adotada para quando se tem o proposito de testar algo que seja global no arquivo

  // System under test
  // Sistema que ta sendo testado

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return variable PORT', () => {
    expect(sut.getAppPort()).toBe(3000);
  });

  it('should return variable NODE_ENV', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });
});
