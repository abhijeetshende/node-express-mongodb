module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      "host_name":String,
      "fqdn":String,
      "fqdnHostGroup":[String]
    },
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const FqdnHost = mongoose.model("fqdnhost", schema);
  return FqdnHost;
};
