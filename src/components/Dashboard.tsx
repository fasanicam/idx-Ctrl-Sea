'use client';

import { LcdControl } from './dashboard/LcdControl';
import { LogConsole } from './dashboard/LogConsole';
import { PowerGauge } from './dashboard/PowerGauge';
import { SailControl } from './dashboard/SailControl';
import { WatchdogStatus } from './dashboard/WatchdogStatus';

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Column 1 */}
      <div className="flex flex-col gap-6">
        <SailControl />
        <PowerGauge />
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-6">
        <LcdControl />
        <WatchdogStatus />
      </div>

      {/* Column 3 */}
      <div className="lg:col-span-1">
        <LogConsole />
      </div>
    </div>
  );
}
