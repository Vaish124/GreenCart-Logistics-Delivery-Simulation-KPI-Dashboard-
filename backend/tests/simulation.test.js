const { runSimulation } = require('../src/utils/simulation');

test('simulation returns expected structure and calculates efficiency', () => {
  const drivers = [{id:'d1', name:'A', current_shift_hours:0, past_7_day_hours:10},{id:'d2',name:'B',current_shift_hours:0,past_7_day_hours:10}];
  const routes = [{route_id:'R1', distance_km:10, traffic_level:'Low', base_time_minutes:30}];
  const orders = [{order_id:'O1', value_rs:1200, assigned_route:'R1'},{order_id:'O2', value_rs:200, assigned_route:'R1'}];
  const out = runSimulation({drivers, routes, orders, number_of_drivers:2, route_start_time:'09:00', max_hours_per_driver:8});
  expect(out).toHaveProperty('byOrder');
  expect(out.total).toBe(2);
  expect(typeof out.efficiency).toBe('number');
});

test('late penalty applied when delivery time > base + 10', () => {
  const drivers = [{id:'d1',name:'A',current_shift_hours:10,past_7_day_hours:50}]; // fatigued -> slower
  const routes = [{route_id:'R1', distance_km:10, traffic_level:'High', base_time_minutes:10}];
  const orders = [{order_id:'O1', value_rs:100, assigned_route:'R1'}];
  const out = runSimulation({drivers, routes, orders, number_of_drivers:1, route_start_time:'09:00', max_hours_per_driver:12});
  expect(out.byOrder[0].penalty === 50 || out.byOrder[0].late === true).toBeTruthy();
});
