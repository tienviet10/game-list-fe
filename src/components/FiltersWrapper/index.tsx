import useGetFilters from '@/services/game/useGetFilters';

// import { MemoizedExclusionFiltersList } from './ExclusionFiltersList';

export default function FiltersWrapper() {
  const filters = useGetFilters();
  console.log('Filters: ', filters);
  return <div>filters here</div>;
  // const [open, setOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);
  // const { genres, platforms, tags, year, errors, loading } = useGetFilters();
  // const dispatch = useDispatch();
  // const homeGameFilters = useAppSelector((state) => state.homeGameFilters);
  // const yearOptions = useMemo(() => {
  //   const currentYear = Math.max(
  //     year ?? new Date().getFullYear(),
  //     FIRST_VIDEO_GAME_RELEASED_YEAR
  //   );
  //   const years = range(currentYear, FIRST_VIDEO_GAME_RELEASED_YEAR);
  //   return years;
  // }, [year]);
  // const screens = useBreakpoint();
  // const content = (
  //   <div>
  //     {loading ? (
  //       <div className={styles.advancedSearchPopoverLoading}>
  //         <Skeleton paragraph={{ rows: 3, width: 600 }} active />
  //         <Skeleton paragraph={{ rows: 3, width: 600 }} active />
  //         <Skeleton paragraph={{ rows: 3, width: 600 }} active />
  //       </div>
  //     ) : (
  //       <>
  //         <MemoizedExclusionFiltersList
  //           title="Genres"
  //           entries={genres}
  //           states={[
  //             {
  //               color: 'green',
  //               values: homeGameFilters.genres.included || [],
  //             },
  //             {
  //               color: 'red',
  //               values: homeGameFilters.genres.excluded || [],
  //             },
  //           ]}
  //           category="genres"
  //         />
  //         <MemoizedExclusionFiltersList
  //           title="Platforms"
  //           entries={platforms ?? []}
  //           states={[
  //             {
  //               color: 'green',
  //               values: homeGameFilters.platforms.included || [],
  //             },
  //             {
  //               color: 'red',
  //               values: homeGameFilters.platforms.excluded || [],
  //             },
  //           ]}
  //           category="platforms"
  //         />
  //         <MemoizedExclusionFiltersList
  //           title="Tags"
  //           entries={tags ?? []}
  //           states={[
  //             {
  //               color: 'green',
  //               values: homeGameFilters.tags.included || [],
  //             },
  //             {
  //               color: 'red',
  //               values: homeGameFilters.tags.excluded || [],
  //             },
  //           ]}
  //           category="tags"
  //         />
  //       </>
  //     )}
  //   </div>
  // );
  // if (errors.length > 0) {
  //   console.log(`Errors: ${errors}`);
  //   return (
  //     <div>
  //       <p>Errors while fetching filters: {errors[0]}</p>
  //     </div>
  //   );
  // }
  // return (
  //   <Layout className={styles.layoutFiltersWrapperContainer}>
  //     {screens.md ? (
  //       <div
  //         aria-label="home-filter-desktop-view"
  //         className={filterFieldStyles.layoutFilterFieldContainer}
  //       >
  //         <div>
  //           <h3 className={filterFieldStyles.h3FilterFieldTitle}>Search</h3>
  //           <Input
  //             allowClear
  //             className={styles.cascaderStyle}
  //             size="middle"
  //             prefix={<SearchOutlined />}
  //             value={homeGameFilters.search}
  //             onChange={(e) => {
  //               dispatch(setHomeFilter({ search: e.target.value }));
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres</h3>
  //           <SelectFilterField<string[]>
  //             mode="multiple"
  //             value={homeGameFilters.genres.included || []}
  //             options={genres}
  //             onSelect={(v) => {
  //               dispatch(toggleItem({ category: 'genres', entry: v }));
  //             }}
  //             onDeselect={(v) => {
  //               dispatch(toggleItem({ category: 'genres', entry: v }));
  //             }}
  //             onClear={() => {
  //               dispatch(clearCategory('genres'));
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <h3 className={filterFieldStyles.h3FilterFieldTitle}>Platforms</h3>
  //           <SelectFilterField<string[]>
  //             mode="multiple"
  //             value={homeGameFilters.platforms.included || []}
  //             options={platforms}
  //             onSelect={(v) => {
  //               dispatch(toggleItem({ category: 'platforms', entry: v }));
  //             }}
  //             onDeselect={(v) => {
  //               dispatch(toggleItem({ category: 'platforms', entry: v }));
  //             }}
  //             onClear={() => {
  //               dispatch(clearCategory('platforms'));
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <h3 className={filterFieldStyles.h3FilterFieldTitle}>Tags</h3>
  //           <SelectFilterField<string[]>
  //             mode="multiple"
  //             value={homeGameFilters.tags.included || []}
  //             options={tags || []}
  //             onSelect={(v) => {
  //               dispatch(toggleItem({ category: 'tags', entry: v }));
  //             }}
  //             onDeselect={(v) => {
  //               dispatch(toggleItem({ category: 'tags', entry: v }));
  //             }}
  //             onClear={() => {
  //               dispatch(clearCategory('tags'));
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <h3 className={filterFieldStyles.h3FilterFieldTitle}>Year</h3>
  //           <SelectFilterField<number>
  //             mode={undefined}
  //             value={homeGameFilters.year}
  //             options={yearOptions}
  //             onChange={(value) => {
  //               dispatch(setHomeFilter({ year: value }));
  //             }}
  //           />
  //         </div>
  //         <div>
  //           <Popover
  //             placement="bottomRight"
  //             arrow={false}
  //             content={content}
  //             trigger="click"
  //             open={open}
  //             onOpenChange={(newOpen) => setOpen(newOpen)}
  //           >
  //             <Button
  //               className={styles.advancedSearchPopoverButton}
  //               type="primary"
  //               icon={<MenuOutlined />}
  //               size="middle"
  //             />
  //           </Popover>
  //         </div>
  //       </div>
  //     ) : (
  //       <Space
  //         aria-label="home-filter-mobile-view"
  //         direction="horizontal"
  //         size={screens.sm ? 48 : 24}
  //         className={styles.spaceFiltersWrapperContainer}
  //       >
  //         <Search
  //           className={styles.searchFiltersWrapperSearch}
  //           placeholder="input search text"
  //           size="large"
  //           onSearch={() => {}}
  //           enterButton="Search"
  //         />
  //         <Button
  //           size="large"
  //           type="primary"
  //           onClick={() => {
  //             setCollapsed(!collapsed);
  //           }}
  //           className={styles.buttonFiltersWrapperButton}
  //         >
  //           {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  //         </Button>
  //       </Space>
  //     )}
  //     {contextHolder}
  //   </Layout>
  // );
}
