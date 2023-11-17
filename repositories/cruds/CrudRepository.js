import * as AxiosRepository from "../axios/AxiosRepository";

const CrudRepository = {
  getAll: (url) => {
    return AxiosRepository.GET(`${url}`);
  },
  get: (url) => {
    return AxiosRepository.GET(`${url}`);
  },
  create: (url, body) => {
    return AxiosRepository.POST(`${url}`, body);
  },
  delete: (url) => {
    return AxiosRepository.DELETE(`${url}`);
  },
  edit: (url, body) => {
    return AxiosRepository.PUT(`${url}`, body);
  },
  search: (url, body) => {
    return AxiosRepository.POST(url, body);
  },
};
export default CrudRepository;
