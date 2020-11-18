module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      // name: String,
      // type: String,
      // services: [String],
      // description: String,
      name:String,
      type:String,
      description:String,
      https:Boolean,
      ssh:Boolean,
      captive_portal:Boolean,
      radius_sso:Boolean,
      dns:Boolean,
      ping:Boolean,
      web_proxy:Boolean,
      ssl_vpn_tunnel:Boolean,
      dynamic_routing:Boolean,
      snmp:Boolean,
      smtp_relay:Boolean,
    }
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Zone = mongoose.model("zone", schema);
  return Zone;
};
