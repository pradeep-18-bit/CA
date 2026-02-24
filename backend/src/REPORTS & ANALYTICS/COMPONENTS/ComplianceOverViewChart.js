import React from "react";

/**
 * Expects data: [
 *  { label: 'GST', completed: 60, pending: 40, raw: { total, completed, pending } },
 *  ...
 * ]
 *
 * Renders a stacked bar: completed (bottom) + pending (top).
 * Bars are scaled by percentages and capped at 100.
 */
const ComplianceOverviewChart = ({ data = [] }) => {
  const yAxisLabels = ['100', '75', '50', '25', '0'];

  const styles = {
    chartGridContainer: {
      height: '300px',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '16px 0 0 0',
      position: 'relative',
    },
    chartGridLine: {
      position: 'absolute',
      left: '30px',
      right: '8px',
      borderTop: '1px dashed #d1d5db',
      zIndex: 0,
    }
  };

  // Protect against empty data
  if (!Array.isArray(data) || data.length === 0) {
    return <div style={{ padding: 24, color: '#6b7280' }}>No data to display</div>;
  }

  // Ensure bars are ordered and width friendly
  const maxBars = data.length;
  const gap = 12;
  // Render
  return (
    <div style={{ position: 'relative' }}>
      <div style={styles.chartGridContainer}>
        {/* horizontal grid lines */}
        {yAxisLabels.map((label, index) => (
          <div
            key={`grid-${label}`}
            style={{
              ...styles.chartGridLine,
              bottom: `${(index / (yAxisLabels.length - 1)) * 100}%`,
              display: index === yAxisLabels.length - 1 ? 'none' : 'block'
            }}
          />
        ))}

        {/* left Y labels */}
        <div style={{ width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%', fontSize: '11px', color: '#6b7280', zIndex: 1 }}>
          {yAxisLabels.map(label => (
            <span key={label} style={{ height: '20%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>{label}</span>
          ))}
        </div>

        {/* Bars */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', gap: gap, paddingRight: 8, zIndex: 1 }}>
          {data.map((item) => {
            // ensure numbers and cap at 100
            const completed = Math.max(0, Math.min(100, Number(item.completed) || 0));
            const pending = Math.max(0, Math.min(100, Number(item.pending) || 0));
            // If rounding pushes sum > 100, scale down proportionally
            let comp = completed;
            let pend = pending;
            const sum = completed + pending;
            if (sum > 100) {
              const scale = 100 / sum;
              comp = Math.round(comp * scale);
              pend = Math.round(pend * scale);
            }

            return (
              <div key={item.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                <div style={{ width: '20%', height: 220, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {/* Container to show stacked bars */}
                  <div style={{ width: '100%', height: '100%', borderRadius: 8, position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'visible' }}>
                    {/* completed (bottom) */}
                    <div
                      title={`Completed: ${comp}% (${item.raw?.completed ?? ""})`}
                      style={{
                        width: '100%',
                        height: `${comp}%`,
                        background: '#073D7F',
                        borderRadius: comp === 100 ? 8 : '6px 6px 0 0',
                        transition: 'height 300ms ease'
                      }}
                    />
                    {/* pending (top) */}
                    <div
                      title={`Pending: ${pend}% (${item.raw?.pending ?? ""})`}
                      style={{
                        position: 'absolute',
                        top: `${100 - pend}%`,
                        left: 0,
                        right: 0,
                        height: `${pend}%`,
                        background: '#686767ff',
                        borderRadius: pend === 100 ? 8 : '0 0 6px 6px',
                        transition: 'top 300ms ease, height 300ms ease',
                        opacity: 0.95
                      }}
                    />
                    {/* white border overlay for clarity */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Label + raw counts */}
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: '#374151', textAlign: 'center' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
                  {item.raw ? `${item.raw.completed}/${item.raw.total} completed` : `${comp}%`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComplianceOverviewChart;
