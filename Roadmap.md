🧭 ROADMAP (FROM SCRATCH – MOUSE-ONLY FARM GAME)
~~🧱 Phase 0 — Bootstrap~~

Goal: project chạy được, không dính logic

~~0.1 Setup Next.js~~
~~0.2 Setup Three.js / React Three Fiber~~
~~0.3 Setup state (Zustand)~~
~~0.4 Scene cơ bản (camera, light, ground)~~

👉 Outcome: có “sandbox 3D”

~~🌍 Phase 1 — Grid World~~

Goal: nền tảng toàn bộ game

~~1.1 Define grid size (NxN)~~
~~1.2 Tạo data grid (2D array)~~
~~1.3 Map grid → world position
~~1.4 Render grid (instanced hoặc simple mesh)~~
~~1.5 Raycast từ chuột → tile~~
~~1.6 Hover highlight tile~~

👉 Outcome: rê chuột thấy ô, click xác định ô

🖱️ Phase 2 — Interaction System (Mouse-driven)

Goal: mọi hành động đi qua chuột

2.1 Left click → select tile
2.2 Right click → action
2.3 Define action types (plant, harvest, etc.)
2.4 Action dispatcher (central handler)
2.5 Context logic (tile quyết định action)

OVERWRITE:
2.1 Toolbar => Define action types (plant, harvest, etc.)
2.2 Left click with toolbar to action

👉 Outcome: click vào ô → game hiểu bạn muốn làm gì

🌱 Phase 3 — Farming Core (NO UI trước)

Goal: gameplay loop hoạt động

3.1 Define crop types
3.2 Plant vào tile
3.3 Growth system (time-based)
3.4 Stage update
3.5 Harvest

👉 Outcome: loop hoàn chỉnh
👉 click đất → trồng → chờ → thu hoạch

🎒 Phase 4 — Inventory (logic trước UI)

Goal: lưu trữ item

4.1 Define item system
4.2 Add item khi harvest
4.3 Consume item khi plant
4.4 Stack logic

👉 Outcome: game có tài nguyên

🧰 Phase 5 — Basic UI Layer

Goal: hiển thị + control

5.1 Inventory UI (grid đơn giản)
5.2 Selected item (seed đang cầm)
5.3 Tooltip cơ bản
5.4 Simple HUD

👉 Outcome: người chơi “biết mình đang làm gì”

🔨 Phase 6 — Crafting System

Goal: nâng cấp gameplay loop

6.1 Define recipes
6.2 Craft logic
6.3 Craft UI
6.4 Feedback (đủ/thiếu nguyên liệu)

👉 Outcome: farm → craft → giá trị cao hơn

🏪 Phase 7 — Shop System

Goal: kinh tế

7.1 Currency
7.2 Buy seeds
7.3 Sell items
7.4 Shop UI

👉 Outcome: loop đầy đủ:

farm → craft → bán → mua → farm

⏱️ Phase 8 — Time System

Goal: ổn định simulation

8.1 Global time source
8.2 Growth calculation bằng timestamp
8.3 Optional: day/night

👉 Outcome: game không phụ thuộc FPS

⚡ Phase 9 — Optimization (chỉ làm khi cần)

Goal: giữ FPS ổn

9.1 Optimize raycast (chỉ grid)
9.2 Instanced rendering
9.3 Update selective tiles

👉 Outcome: chạy mượt

🎨 Phase 10 — Polish

Goal: cảm giác game

10.1 Animation cây lớn
10.2 Visual feedback (hover, click, harvest)
10.3 UI đẹp hơn
10.4 Sound (optional)

👉 Outcome: playable game

🚀 Phase 11 — Expand

Goal: thêm depth

11.1 Nhiều loại cây
11.2 Nhiều recipe
11.3 Balance
11.4 Save/load
