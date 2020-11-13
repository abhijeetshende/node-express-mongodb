module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      endipadd: String,
      groups: [String] ,
      ipadd: String,
      ipadd_List: String,
      iphost_type: String,
      ipversion: String,
      name: String,
      startipadd: String,
      subnet: String
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
