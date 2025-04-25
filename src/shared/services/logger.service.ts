import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports } from 'winston';
import { Injectable } from '@nestjs/common';
const { combine, timestamp, prettyPrint, simple } = format;

@Injectable()
export class LoggerService {
  constructor(private readonly configService: ConfigService) {}

  private logger = createLogger({
    format:
      this.configService.get('env') === 'local'
        ? combine(timestamp(), prettyPrint())
        : combine(timestamp(), simple()),
    transports: [new transports.Console()],
  });

  log(message: string, meta?: Record<string, any>) {
    this.logger.info({ message, meta });
  }

  warn(message: string, meta?: Record<string, any>) {
    this.logger.warn({ message, meta });
  }

  error(message: string, meta?: Record<string, any>) {
    this.logger.error({ message, meta });
  }

  verbose(message: string, meta?: Record<string, any>) {
    this.logger.verbose({ message, meta });
  }

  debug(message: string, meta?: Record<string, any>) {
    this.logger.debug({ message, meta });
  }

  silly(message: string, meta?: Record<string, any>) {
    this.logger.silly({ message, meta });
  }
}
