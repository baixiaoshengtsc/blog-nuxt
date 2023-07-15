import ApiService from "../api"
import { LoginDTO } from "../bean/dto"
import { BasicListModel, DataT} from '../bean/model'
import { ArticleVO } from '../bean/vo'
class Login extends ApiService {
  constructor(feature: string) {
    super(feature)
  }
  public async login(params: LoginDTO): DataT<BasicListModel<ArticleVO>> {
    return await this.$post('', params)
  }
}

export default new Login('login')