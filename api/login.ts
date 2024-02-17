import ApiService from "../api"
import { LoginDTO } from "../bean/dto"
import { BasicObjectModel ,BasicPlainModel, DataT} from '../bean/model'
import { ArticleVO, LoginVO } from '../bean/vo'
class Login extends ApiService {
  constructor(feature: string) {
    super(feature)
  }
  public async login(params: LoginDTO): DataT<BasicObjectModel<LoginVO>> {
    return await this.$post('', params)
  }
}

export default new Login('login')