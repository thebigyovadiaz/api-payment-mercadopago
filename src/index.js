import dotenv from 'dotenv'
dotenv.config();

import api from './server/index.js'
import getLoggerHandler from './handlers/logger.handler.js'

(async function() {
  const PORT = process.env.PORT;

  api.listen(PORT, () => {
    getLoggerHandler("[SERVER]", "INFO", `Server started on port: ${PORT}`)
  });
})();
