import MongoClient from 'mongodb';

class DBclient {
  constructor() {
    // Get connection details from the environment variables
    this.connected = false;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_NAME || 'files_manager';

    // Connection url to mongoDB
    const url = `mongodb://${host}:${port}`;

    // Initialize the database client
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the database
    this.client.connect((err) => {
      if (err) {
        console.error('Error connecting to the database: ', err);
      } else {
        console.log('Connected to the database');
        this.connected = true;
        this.db = this.client.db(dbName);
      }
    });
  }

  isAlive() {
    return this.connected;
  }

  async nbusers() {
    return this.db.collection('users').countDocuments();
  }

  async nbfiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBclient();
export default dbClient;
