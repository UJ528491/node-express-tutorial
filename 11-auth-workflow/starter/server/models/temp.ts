/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { ObjectId } = require("mongodb");

const agg = [
  {
    $match: {
      product: new ObjectId("615c873ad584c748cc86e5bb"),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: "$rating",
      },
      numberOfReviews: {
        $sum: 1,
      },
    },
  },
];

MongoClient.connect(
  "",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (connectErr: any, client: any) {
    assert.equal(null, connectErr);
    const coll = client.db("").collection("");
    coll.aggregate(agg, (cmdErr: any, result: any) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  }
);
