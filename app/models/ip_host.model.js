module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      "name": String,
      "version": String,
      "type": String,
      "ip_address": String,
      "subnet": String,
      "start_ip_address": String,
      "end_ip_address": String,
      "ip_address_List": String,
      "ip_host_group": [String],
    }
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
