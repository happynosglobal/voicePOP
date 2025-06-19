const ChartLegend = ({ label, value, color }) => (
  <div className="flex items-center gap-1.5">
    <span
      className="w-4 h-1.5 block rounded-[30px]"
      style={{ backgroundColor: color }}
    ></span>
    <span className="text-sm font-medium">{label}</span>
    {value !== undefined && value !== null && (
      <span className="text-xl font-semibold">{value}%</span>
    )}
  </div>
);
export default ChartLegend;
