module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      "name":String,
      "ipversion":String,
      "type":String ,//network,ipaddress,iprange,iplisit
      "ipaddress":String,
      "subnet":String,
      "startip":String,
      "endip":String,
      "ipaddresslist":[String],
      "iphostgroup":[String]
    },
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const IpHost = mongoose.model("iphost", schema);
  return IpHost;
};
