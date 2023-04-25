import { ConnectorFlow } from "../typing/connector";
import { ConnectorAsInstance } from "../utils/connector-as-static";
import { PrimaryConnector } from "./primary-controller";
import axios from "axios";
import { BestBooks, MyBooks, RecomendationBooks } from "../typing/book";

export class BookConnector extends PrimaryConnector<ConnectorFlow.BOOKS> {
  @ConnectorAsInstance()
  public static getInstance: () => BookConnector;

  constructor() {
    super(ConnectorFlow.BOOKS);
  }

  public getBestBooks = () => {
    return axios.get<BestBooks>(this.urls.GET_BEST_BOOKS);
  };

  public getRecomendationBooks = (userId: number) => {
    return axios.get<RecomendationBooks>(
      this.urls.GET_RECOMENDATION_BOOKS(userId)
    );
  };
  public getMyBooks = (userId: number) => {
    return axios.get<MyBooks>(this.urls.GET_MY_BOOKS(userId));
  };
}
