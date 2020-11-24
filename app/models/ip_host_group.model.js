module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {

      name: String,
      version: String,
      ip_hosts: [String],
      description: String,
    }
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const IpHostGroup = mongoose.model("iphostgroup", schema);
  return IpHostGroup;
};
