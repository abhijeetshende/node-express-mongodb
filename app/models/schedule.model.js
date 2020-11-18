module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      description: String,
      types: String,
      isOneTimeAllDay: Boolean,
      isRecAllDayL: Boolean,
      startDate: String,
      tillDate: String,
      repeats: String,
      startTime: String,
      endTime: String,
      on_date: String,
      on_month: String,
      dayList: [String],
    }
    // { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Schedule = mongoose.model("schedule", schema);
  return Schedule;
};
