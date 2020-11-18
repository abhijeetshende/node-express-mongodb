module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      host_name: String,
      fqdn: String,
      fqdn_hosts: [String]
    },
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const FqdnHostList = mongoose.model("fqdnhostlist", schema);
  return FqdnHostList;
};
