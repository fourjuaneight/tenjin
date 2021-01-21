import {
  HttpService,
  Module,
  OnModuleInit,
  HttpModule as BaseHttpModule,
} from "@nestjs/common";

@Module({
  imports: [BaseHttpModule],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const axios = this.httpService.axiosRef;

    // add request interceptor with auth key param
    axios.interceptors.request.use((config) => {
      return config;
    });
  }
}
