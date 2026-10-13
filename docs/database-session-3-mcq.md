# Database Session 3: MCQ question bank

**Session:** Introduction to Query Optimization
**Primary source:** AdvancedDatabase3.pdf (lecture page numbers shown on slides).
**Assessment format:** Four options, exactly one correct answer per question.

### Q001. Which component validates SQL syntax and table names?

A. Parser
B. Rewriter
C. Optimizer
D. Executor

**Correct answer:** A
**Explanation:** The Parser checks syntax and validates identifiers against the system catalog.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4.

### Q002. A query references a view. Which phase expands it into its underlying query?

A. Parser
B. Buffer manager
C. Rewriter
D. Executor

**Correct answer:** C
**Explanation:** The Rewriter handles rules and view expansion before planning.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4.

### Q003. What is the principal task of the cost-based Optimizer?

A. Run physical joins
B. Commit transactions
C. Check SQL grammar
D. Select a low-estimated-cost execution plan

**Correct answer:** D
**Explanation:** The planner compares candidate execution plans using statistical cost estimates.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4.

### Q004. Which stage physically scans tables and returns the result rows?

A. Optimizer
B. Executor
C. Rewriter
D. Parser

**Correct answer:** B
**Explanation:** The Executor carries out scans, joins and sorts in the selected plan.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4.

### Q005. Which sequence describes the query lifecycle presented in the lecture?

A. Parser → Executor → Optimizer → Rewriter
B. Rewriter → Optimizer → Parser → Executor
C. Parser → Rewriter → Optimizer → Executor
D. Optimizer → Parser → Executor → Rewriter

**Correct answer:** C
**Explanation:** Validation precedes rewriting, planning and physical execution.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4.

### Q006. Why might the plan selected by the Optimizer perform poorly?

A. Table statistics are outdated
B. The Rewriter sorts every table
C. A view cannot be optimized
D. EXPLAIN disables indexes

**Correct answer:** A
**Explanation:** Inaccurate statistics can lead to incorrect row estimates and poor plan choices.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4,39.

### Q007. Which catalog information does the lecture associate with the Optimizer's row estimates?

A. pg_roles
B. pg_class only
C. pg_locks
D. pg_stats

**Correct answer:** D
**Explanation:** The lecture explicitly identifies pg_stats as the basis for cost estimates.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 4,39.

### Q008. What distinguishes EXPLAIN ANALYZE from ordinary EXPLAIN?

A. It creates a missing index
B. It executes the query and reports actual measurements
C. It always changes the join order
D. It disables cost estimates

**Correct answer:** B
**Explanation:** ANALYZE executes the statement and reports actual timings and rows.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 5–6.

### Q009. Why should EXPLAIN ANALYZE be used carefully with an UPDATE?

A. It always commits a new index
B. It runs without any transaction support
C. It actually executes the UPDATE
D. It never produces a plan

**Correct answer:** C
**Explanation:** The analyzed statement is executed, so changes may occur; the slide advises using a transaction.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 6.

### Q010. Which EXPLAIN option shows output columns and schema-qualified names?

A. VERBOSE
B. BUFFERS
C. ANALYZE
D. COSTS

**Correct answer:** A
**Explanation:** VERBOSE adds plan details such as Output and schema-qualified names.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 7.

### Q011. Which option provides estimated startup and total cost?

A. VERBOSE
B. SETTINGS
C. BUFFERS
D. COSTS

**Correct answer:** D
**Explanation:** COSTS reports estimated startup and total work.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 6.

### Q012. Which option exposes shared hit and disk read counts?

A. BUFFERS
B. VERBOSE
C. ANALYZE
D. COSTS

**Correct answer:** A
**Explanation:** BUFFERS reports buffer accesses, including shared hits and reads.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 7,11.

### Q013. What do the two figures in cost=0.00..100.50 represent?

A. Startup and total estimated cost
B. Rows kept and rows rejected
C. Minimum and maximum milliseconds
D. Buffer hits and reads

**Correct answer:** A
**Explanation:** The first figure is startup cost; the second is total estimated cost.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 8.

### Q014. In Seq Scan ... rows=51 width=384, what does width=384 estimate?

A. Query milliseconds
B. Average bytes per row
C. Rows removed by filter
D. Pages scanned

**Correct answer:** B
**Explanation:** Width estimates the average bytes per output row.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 8.

### Q015. For a plan node with actual time=0.009..0.567, what are these figures?

A. CPU cost and I/O cost
B. First-row and completion times in milliseconds
C. Planning and execution cost units
D. Minimum and maximum row counts

**Correct answer:** B
**Explanation:** The two actual-time figures describe time to first row and to return all rows.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 9.

### Q016. A plan node reports loops=3. What does this indicate?

A. Three output columns
B. Three disk pages
C. The node executed three times
D. Three distinct indexes

**Correct answer:** C
**Explanation:** Loops counts how often that plan node executes.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 9.

### Q017. A Seq Scan reports rows=51 and Rows Removed by Filter: 949, with one loop. How many rows were checked?

A. 898
B. 51
C. 949
D. 1000

**Correct answer:** D
**Explanation:** The scan inspected 51 qualifying plus 949 rejected rows.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 10.

### Q018. What does Buffers: shared hit=88 mean in the lecture's example?

A. 88 indexes were scanned
B. 88 block accesses were served from shared buffers
C. 88 rows were filtered
D. 88 blocks were necessarily read from disk

**Correct answer:** B
**Explanation:** A shared hit means the requested block was already in the shared buffer pool.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 11.

### Q019. What does Planning Time measure?

A. Time spent returning rows
B. Time needed for table creation
C. Time spent finding an execution plan
D. Time spent writing result files

**Correct answer:** C
**Explanation:** Planning Time measures plan selection rather than data retrieval.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 12.

### Q020. Which metric should be compared with actual rows to judge estimate accuracy?

A. Width
B. Estimated rows
C. Planning time
D. Shared hit

**Correct answer:** B
**Explanation:** A gap between estimated rows and actual rows suggests inaccurate estimates.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 13.

### Q021. Before an index exists on replacement_cost, which access method appears in the lecture's film example?

A. Hash Join
B. Index Only Scan
C. Bitmap Index Scan
D. Seq Scan

**Correct answer:** D
**Explanation:** The example initially uses Seq Scan to inspect the non-indexed column.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 8.

### Q022. What is the first step in the lecture's two-stage bitmap access path?

A. Fetch every heap row
B. Bitmap Index Scan to identify matching locations
C. Sort the entire film table
D. Build a join hash table

**Correct answer:** B
**Explanation:** The Bitmap Index Scan finds matching locations before heap retrieval.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 14.

### Q023. What is the primary output of a Bitmap Index Scan in the lecture?

A. A set of joined tuples
B. A sorted copy of the heap
C. A bitmap marking pages to visit
D. A permanently stored index

**Correct answer:** C
**Explanation:** Its bitmap guides subsequent heap-page retrieval.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 14.

### Q024. What does the Bitmap Heap Scan do after the index phase?

A. Rewrites the query tree
B. Rebuilds the index
C. Visits heap pages indicated by the bitmap
D. Hashes the customer table

**Correct answer:** C
**Explanation:** The heap scan fetches the relevant pages rather than the entire table.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 15.

### Q025. In the bitmap plan, what does Heap Blocks (exact=39) indicate?

A. 39 rows passed the filter
B. 39 milliseconds were spent planning
C. 39 exact heap blocks were accessed
D. 39 indexes were built

**Correct answer:** C
**Explanation:** Exact identifies heap blocks visited by the bitmap heap phase.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 15.

### Q026. Why may bitmap access beat repeated regular index lookups for medium-sized results?

A. It never uses a buffer pool
B. It stores the result permanently
C. It avoids all data reads
D. It groups heap-page visits to reduce random I/O

**Correct answer:** D
**Explanation:** Ordering page retrieval can reduce random-access overhead.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 15.

### Q027. The lecture compares execution times 0.591 ms and 0.116 ms. Which conclusion is supported for that example?

A. The first plan read no rows
B. Indexing is always slower
C. The bitmap plan was about five times faster
D. Performance is unchanged

**Correct answer:** C
**Explanation:** 0.591 divided by 0.116 is approximately 5.1 for the reported run.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 16.

### Q028. In the example, what happens to Rows Removed by Filter after the bitmap access path is selected?

A. It rises from 0 to 949
B. It remains 949
C. It equals 51
D. It falls from 949 to 0

**Correct answer:** D
**Explanation:** The lecture's comparison reports zero rows removed for its indexed plan.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 16.

### Q029. Which factors does the lecture say influence the physical join choice?

A. Table size, indexes and work_mem
B. Only the table names
C. Only the number of output aliases
D. Only the SELECT column order

**Correct answer:** A
**Explanation:** The planner considers sizes, index access and available memory.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 17.

### Q030. For a simple unindexed Nested Loop Join, how many inner rows may be compared across N outer and M inner rows?

A. N × M
B. N + M
C. N / M
D. log(N + M)

**Correct answer:** A
**Explanation:** Each outer row can scan all M inner rows, giving O(N × M).
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 18–19.

### Q031. In a Nested Loop plan, what is the outer table?

A. The table always listed first in SQL
B. The table always containing more rows
C. The driving input scanned once
D. The table with the primary key

**Correct answer:** C
**Explanation:** The outer side drives repeated inner lookups.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 19.

### Q032. Why is a small filtered outer input attractive for Nested Loop?

A. It forces both tables to sort
B. It limits the number of inner lookups
C. It increases hash-table size
D. It removes the join predicate

**Correct answer:** B
**Explanation:** Fewer outer rows mean fewer executions of the inner access path.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 20–21.

### Q033. What makes an inner input especially efficient for a Nested Loop?

A. An unindexed wide column
B. A larger inner Seq Scan
C. An unrelated ORDER BY
D. An index on the inner join key

**Correct answer:** D
**Explanation:** An indexed lookup avoids repeatedly scanning the whole inner table.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 18,20.

### Q034. Given Costouter=8, Rowsouter=5 and Costinner=2, what is the simplified total Nested Loop cost?

A. 18
B. 40
C. 80
D. 10

**Correct answer:** A
**Explanation:** Using 8 + (5 × 2), the estimated cost is 18 units.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 21.

### Q035. If Rowsouter grows from 5 to 500 with the other simplified cost terms fixed, what happens?

A. The join automatically becomes invalid
B. Only startup cost changes
C. The repeated inner-scan contribution grows 100-fold
D. Cost stays constant

**Correct answer:** C
**Explanation:** The multiplicative term depends directly on outer row count.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 21.

### Q036. For customer JOIN rental WHERE customer_id=1, why is Nested Loop plausible?

A. The customer filter yields a very small driving input
B. Both tables must be sorted
C. Hashing is required for equality
D. The output is always empty

**Correct answer:** A
**Explanation:** The selective customer predicate makes the outer side very small.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 22.

### Q037. In the lecture's filtered customer lab, why might the inner scan show loops=1?

A. Only one outer customer row drives the inner lookup
B. The entire rental table has one row
C. The optimizer skips the join
D. The query creates one index

**Correct answer:** A
**Explanation:** One outer row triggers one execution of the inner node.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 22.

### Q038. What is the first phase of a Hash Join?

A. Build a hash table from the smaller input
B. Repeatedly scan the inner table for each row
C. Sort both tables by the join key
D. Merge two sorted streams

**Correct answer:** A
**Explanation:** The build phase hashes one input into an in-memory table.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 23–25.

### Q039. What happens in the Hash Join probe phase?

A. The database creates a B-tree
B. Rows are grouped with GROUP BY
C. The parser expands all views
D. Rows from the other input look up matching hash keys

**Correct answer:** D
**Explanation:** The other input is scanned and its join keys are probed in the hash table.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 24–25.

### Q040. Which join predicate suits the lecture's Hash Join mechanism?

A. a.price > b.price
B. a.customer_id = b.customer_id
C. a.name LIKE b.prefix
D. a.price BETWEEN b.lo AND b.hi

**Correct answer:** B
**Explanation:** The lecture's Hash Join is based on equality conditions.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 23,27.

### Q041. Which input is normally hashed for a memory-efficient Hash Join?

A. The final joined output
B. The smaller input
C. The input written first in SQL
D. The larger input regardless of size

**Correct answer:** B
**Explanation:** Building from the smaller input limits memory usage.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 26.

### Q042. An execution plan contains Hash → Seq Scan on language. What role does language play?

A. Building the hash table
B. Sorting output
C. Probing the hash table
D. Filtering the final projection

**Correct answer:** A
**Explanation:** The scan under Hash supplies rows for the build side.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 26,29.

### Q043. What does Batches: 1 suggest for the illustrated Hash Join?

A. One row was returned
B. Hash data fit in one in-memory batch
C. No join condition exists
D. There were no rows

**Correct answer:** B
**Explanation:** The slide contrasts one in-memory batch with multi-batch disk spilling.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 27.

### Q044. What is the likely consequence when a Hash Join has Batches: 8?

A. The query becomes a Merge Join automatically
B. No I/O is possible
C. The index is rebuilt
D. Extra disk I/O can slow the join

**Correct answer:** D
**Explanation:** Multiple batches signal disk-based partitioning/spilling.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 27.

### Q045. Why does work_mem matter for Hash Join?

A. It specifies the SQL parsing order
B. It stores SQL view definitions
C. It counts transaction commits
D. It constrains memory available for the hash operation

**Correct answer:** D
**Explanation:** Insufficient work_mem can lead to a disk spill.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 23,27.

### Q046. Which situation most favors Hash Join according to the lecture?

A. A range predicate without equality
B. Already sorted huge inputs with a required ordered output
C. Large unsorted tables joined on equality without useful indexes
D. Tiny filtered data with an indexed lookup

**Correct answer:** C
**Explanation:** Hash Join avoids repeated scans and expensive presorting in this scenario.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 28,36.

### Q047. What is the central prerequisite for the merge phase of a Merge Join?

A. One outer row only
B. Inputs ordered by the join key
C. A hash table of every row
D. An index on every selected column

**Correct answer:** B
**Explanation:** Merge Join compares streams sorted on the join key.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 30–31.

### Q048. When two current join keys differ in a Merge Join, which pointer moves?

A. The pointer on the smaller key
B. Always the pointer on the larger key
C. Always both pointers
D. Neither pointer

**Correct answer:** A
**Explanation:** Advancing the smaller key aligns the two ordered streams.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 31–32.

### Q049. Assuming both inputs are already sorted, what is the lecture's ideal Merge Join complexity?

A. O(N × M)
B. O(log N × log M)
C. O(N + M)
D. O(N² + M²)

**Correct answer:** C
**Explanation:** The two ordered inputs can be traversed linearly, excluding sorting.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 31,36.

### Q050. When sorted join inputs are obtained via suitable B-tree indexes, which expense may be avoided?

A. All join comparisons
B. An explicit sort before the merge
C. All table access
D. Query planning

**Correct answer:** B
**Explanation:** An index-ordered scan can supply the sequence needed by Merge Join.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 33.

### Q051. Without index-ordered inputs, what costly operation may appear before Merge Join?

A. Bitmap Index Scan only
B. Sort nodes with O(N log N) work
C. A new table definition
D. A transaction rollback

**Correct answer:** B
**Explanation:** Explicit sorting adds preprocessing overhead.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 33.

### Q052. Why is Merge Join attractive for huge sorted inputs exceeding RAM?

A. It requires loading all rows into one hash table
B. It eliminates the join condition
C. It always needs repeated inner scans
D. It can stream ordered inputs with modest memory

**Correct answer:** D
**Explanation:** The merge phase streams sorted data without building a full in-memory hash table.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 30,34.

### Q053. A query requires output ordered by its join key. Which benefit can favor Merge Join?

A. It never checks equality
B. It must execute as a Seq Scan
C. Its output follows the merge key order
D. It always uses less CPU than every alternative

**Correct answer:** C
**Explanation:** The merge process can naturally maintain the desired key ordering.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 34.

### Q054. Why does the lab run SET enable_hashjoin = off and SET enable_nestedloop = off?

A. To remove all indexes from disk
B. To encourage a Merge Join for demonstration
C. To change the join predicate to BETWEEN
D. To disable SQL parsing

**Correct answer:** B
**Explanation:** Disabling competing join strategies helps demonstrate Merge Join.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 30,35.

### Q055. What is the purpose of RESET enable_hashjoin and RESET enable_nestedloop after the demonstration?

A. To restore the previous planner settings
B. To remove EXPLAIN output
C. To erase table statistics
D. To force a persistent Merge Join

**Correct answer:** A
**Explanation:** RESET restores the affected planner options.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 30.

### Q056. In the lab, why compare plans before and after running ANALYZE on tables?

A. ANALYZE removes all filters
B. ANALYZE recompiles SQL functions
C. Refreshed statistics may change cost estimates and plan choice
D. ANALYZE always forces an index

**Correct answer:** C
**Explanation:** ANALYZE updates planner statistics, potentially influencing the selected path.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 38–39.

### Q057. A filtered rental query returns five rows but Nested Loop is not chosen. What is the correct conclusion?

A. Hash Join requires at least 1000 outer rows
B. The optimizer ignores estimated costs
C. Nested Loop is prohibited for rental tables
D. Outer cardinality alone does not determine total join cost

**Correct answer:** D
**Explanation:** The lecture invites comparison of small outer cardinality with inner lookup cost and table size.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 37.

### Q058. What is the point of comparing enable_indexscan off versus on in the final lab?

A. To alter the film table schema
B. To test trigger execution
C. To validate referential constraints
D. To observe how scan settings change estimated plans and performance

**Correct answer:** D
**Explanation:** The lab changes planner preferences and compares EXPLAIN measurements.
**Source:** AdvancedDatabase3.pdf, lecture slide(s) 38.
