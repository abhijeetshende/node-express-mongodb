module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      "hostname":String,
      "type":String,
      "macaddress":String
    },
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const MacHost = mongoose.model("machost", schema);
  return MacHost;
};
