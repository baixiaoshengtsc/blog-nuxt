import ApiService from "../api"
import { LoginDTO } from "../bean/dto"
import { BasicPlainModel, DataT} from '../bean/model'
import { ArticleVO } from '../bean/vo'
class Login extends ApiService {
  constructor(feature: string) {
    super(feature)
  }
  public async login(params: LoginDTO): DataT<BasicPlainModel<string>> {
    return await this.$post('', params)
  }
}

export default new Login('login')