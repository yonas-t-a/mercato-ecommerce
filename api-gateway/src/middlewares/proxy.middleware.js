import axios from 'axios';

export const proxy = (serviceUrl) => async (req, res, next) => {
  try {
    const { method, originalUrl, headers, body } = req;
    const url = `${serviceUrl}${originalUrl}`;

    // Remove host header to avoid conflicts
    delete headers.host;

    const { data, status, headers: responseHeaders } = await axios({
      method,
      url,
      data: body,
      headers,
    });
    
    // Forward headers from the microservice response
    for (const key in responseHeaders) {
      res.setHeader(key, responseHeaders[key]);
    }
    
    res.status(status).json(data);
  } catch (error) {
    const { status, data } = error.response || {};
    res.status(status || 500).json(data || { error: 'Gateway Error' });
  }
}; 