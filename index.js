import 'dotenv/config'
import app from './app'
import './src/dbConection'

// start server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
