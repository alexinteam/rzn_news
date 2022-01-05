import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rzn.info/v1',
});
