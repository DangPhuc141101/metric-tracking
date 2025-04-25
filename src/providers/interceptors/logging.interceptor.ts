import { ResponseLogInterface } from '@common/interfaces';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/services';
import { Observable, map } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private debugMode: boolean;
  constructor(
    private readonly appLogger: LoggerService,
    private readonly configService: ConfigService,
  ) {
    this.debugMode = this.configService.get('debugMode');
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();

    const { url, method, headers, body, query } = context
      .switchToHttp()
      .getRequest();

    const response: ResponseLogInterface = { method, url };

    return next.handle().pipe(
      map((data) => {
        if (this.debugMode) {
          response.debug = {
            request: { body, query, headers },
            response: data,
          };
        }

        this.appLogger.log(
          `Request complete. Duration (ms): ${Date.now() - now}ms `,
          response,
        );

        return data;
      }),
    );
  }
}
