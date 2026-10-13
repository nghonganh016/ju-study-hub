# Session 2: Multiple-choice question bank

> Final reviewed bank. Scope: *Physical Storage & Indexing Strategies* (AdvancedDatabases_2.pdf).
> Slide references are 1-based PDF page numbers (PDF page = printed slide number + 2 in most content pages).

**Questions:** 57. **Format:** four options, one correct answer, explanation and slide reference.

## Q01 · `db-s2-original-02`

**Question:** According to the lecture, what is the full physical storage hierarchy?

A. Database cluster → relation → database → page.
B. Database cluster → database → relation → page.
C. Database → relation → page → database cluster.
D. Page → relation → database → database cluster.

**Correct answer:** B

**Explanation:** The cluster contains databases, each contains relations, and a relation consists of physical pages.

**Slide reference:** PDF p. 7 (*Original quiz · Storage hierarchy*).

---

## Q02 · `db-s2-original-04`

**Question:** What is the default PostgreSQL data page size in a conventional build?

A. 4 KB per page, as used in some other storage designs.
B. 16 KB per page, as in some configurations of other DBMS engines.
C. 32 KB per page, four times the PostgreSQL slide default.
D. 8 KB per page, the default Page (Block) size in this lecture.

**Correct answer:** D

**Explanation:** The lecture specifies 8 KB as the default PostgreSQL Page (Block) size, the basic I/O unit.

**Slide reference:** PDF p. 9 (*Original quiz · Page anatomy*).

---

## Q03 · `db-s2-original-07`

**Question:** In an ordinary PostgreSQL heap page, where is unused free space?

A. Between Item Pointers and Tuples inside the Page.
B. Between Page Header and Item Pointers at the page beginning.
C. Inside the Page Header beside free-space metadata.
D. Inside the tuple area, after the last stored row.

**Correct answer:** A

**Explanation:** The pointer array and heap tuples approach each other as the page fills; the gap is available insertion space.

**Slide reference:** PDF p. 10 (*Original quiz · Page anatomy*).

---

## Q04 · `db-s2-original-08`

**Question:** Which characteristic most accurately describes a B-Tree index?

A. It hashes each key and loses support for ordered comparisons.
B. It stores the entire clustered heap in each internal branch.
C. It supports equality predicates but not range predicates.
D. It is balanced, with leaf pages at a uniform tree depth.

**Correct answer:** D

**Explanation:** A balanced B-Tree efficiently navigates sorted keys and supports equality, ordered predicates and range scans.

**Slide reference:** PDF p. 15 (*Original quiz · B-Tree*).

---

## Q05 · `db-s2-original-09`

**Question:** What is the core limitation of a Hash index versus a B-Tree?

A. It cannot use equality comparisons on TEXT columns.
B. It must use a greater tree height than a B-Tree at all sizes.
C. It supports equality lookups but not ordered range queries.
D. It must reorganize the Heap File for each insert.

**Correct answer:** C

**Explanation:** Hash indexes use hashed keys for equality operators; ordered range comparisons require a different index method.

**Slide reference:** PDF p. 17 (*Original quiz · Hash index*).

---

## Q06 · `db-s2-original-10`

**Question:** For which workload is GiST a natural indexing framework?

A. Only integer equality tests on primary-key sequences.
B. Spatial relationships and supported nearest-neighbor operators.
C. Physically clustering heap tuples by insertion time.
D. Compressing oversized PDF values into TOAST chunks.

**Correct answer:** B

**Explanation:** GiST supports extensible search strategies for geometric and related data through appropriate operator classes.

**Slide reference:** PDF p. 18 (*Original quiz · GiST*).

---

## Q07 · `db-s2-original-11`

**Question:** Which structure physically stores unordered PostgreSQL table tuples?

A. A heap file with pages holding row versions.
B. A unique B-Tree where every leaf stores full rows.
C. A Hash index partitioned by primary key.
D. A materialized view automatically ordered by ID.

**Correct answer:** A

**Explanation:** A standard PostgreSQL relation uses heap storage and allows tuples in free locations rather than continuously sorting them.

**Slide reference:** PDF p. 8 (*Original quiz · Heap and MVCC*).

---

## Q08 · `db-s2-original-12`

**Question:** A PostgreSQL TID has the format (block number, offset). What does that mean?

A. The relation's primary-key value and associated database port.
B. The transaction's creation time and number of failed updates.
C. The index type and ordinal number of its root page.
D. A tuple's page and item-pointer position within the heap.

**Correct answer:** D

**Explanation:** TIDs locate physical tuple versions rather than durable logical identities.

**Slide reference:** PDF p. 11 (*Original quiz · Heap and TID*).

---

## Q09 · `db-s2-original-16`

**Question:** What default approximate tuple-size target appears in the slide's TOAST explanation?

A. Exactly 8 KB, with no compression below page size.
B. Exactly 1 MB, which is the mandatory TOAST limit.
C. Exactly 4 KB, fixed for all PostgreSQL builds.
D. About 2 KB, with actual decisions depending on configuration.

**Correct answer:** D

**Explanation:** The TOAST slide gives 2 KB as the approximate size at which PostgreSQL starts compressing and, if needed, moving large values to a TOAST table.

**Slide reference:** PDF p. 12 (*Original quiz · TOAST*).

---

## Q10 · `db-s2-original-18`

**Question:** When an MVCC-updated row receives a new value, what happens in heap storage?

A. The prior tuple is overwritten and immediately loses all snapshot visibility.
B. A new tuple version is created instead of blindly overwriting the previous one.
C. PostgreSQL deletes the whole table page and recreates its index.
D. The update becomes a new database in the same server cluster.

**Correct answer:** B

**Explanation:** Multiple row versions underpin MVCC; earlier versions may remain visible to suitable transactions until reclamation.

**Slide reference:** PDF p. 8 (*Original quiz · Heap and MVCC*).

---

## Q11 · `db-s2-original-19`

**Question:** What bulk-loading sequence is recommended in the lecture when operationally safe?

A. Build secondary indexes after loading the large data batch.
B. Add a new secondary index after every imported tuple.
C. Run CLUSTER for every INSERT before creating any table.
D. Disable all integrity constraints permanently for the database.

**Correct answer:** A

**Explanation:** Loading first and creating secondary indexes afterward avoids repeated maintenance during large imports; do not casually drop essential production constraints.

**Slide reference:** PDF p. 22 (*Original quiz · Bulk loading*).

---

## Q12 · `db-s2-original-22`

**Question:** According to the index-maintenance slides, what can contribute to index bloat?

A. Choosing a B-Tree instead of Hash by itself.
B. Dead index entries persisting after row updates or deletions.
C. Enabling TOAST compression for large text values.
D. Returning fewer rows than expected from a SELECT.

**Correct answer:** B

**Explanation:** The maintenance slide explains that UPDATE and DELETE activity can leave dead entries and contribute to index bloat, which VACUUM helps clean.

**Slide reference:** PDF p. 22 (*Original quiz · Index maintenance*).

---

## Q13 · `db-s2-original-23`

**Question:** Which use case best fits a Generalized Inverted Index (GIN)?

A. Mapping JSONB/array components to potentially many matching rows.
B. Returning rows by a conventional numeric sort key only.
C. Physically moving all heap tuples to primary-key order.
D. Locating one tuple through an individual transaction number.

**Correct answer:** A

**Explanation:** GIN maps searchable component keys to matching posting lists and suits multivalued content.

**Slide reference:** PDF p. 19 (*Original quiz · GIN*).

---

## Q14 · `db-s2-original-24`

**Question:** Why should AI pipelines care about data movement from disk?

A. Every disk read is faster than equivalent RAM access by several orders.
B. Storing vectors in columns automatically eliminates all disk I/O.
C. Page-level locality is irrelevant once a model has been trained.
D. Disk access can be orders of magnitude slower than RAM and leave compute units waiting.

**Correct answer:** D

**Explanation:** Poor layout and oversized reads can make storage I/O the bottleneck even if the model's computation is fast.

**Slide reference:** PDF p. 5 (*Original quiz · Storage and I/O*).

---

## Q15 · `db-s2-original-25`

**Question:** What best compares conventional PostgreSQL heap indexing with InnoDB's clustered primary index?

A. Both databases always store all table tuples in secondary-index leaves.
B. PostgreSQL keeps the heap automatically ordered by primary-key value.
C. PostgreSQL stores heap tuples separately and index entries point to TIDs.
D. InnoDB primary-key leaves store only TIDs into an unordered heap.

**Correct answer:** C

**Explanation:** InnoDB's clustered primary index holds row data in leaves; PostgreSQL normally uses separate heap tuples and nonclustered indexes.

**Slide reference:** PDF p. 20 (*Original quiz · Clustered vs nonclustered*).

---

## Q16 · `db-s2-002`

**Question:** A PostgreSQL cluster hosts app_db, analytics_db, and ai_db. What is a plausible effect of a heavy analytics scan?

A. The scan may compete with the other databases for shared memory and disk I/O.
B. Each database has a completely isolated CPU and buffer pool.
C. A scan can access only CPU cycles reserved for its own database.
D. The scan automatically converts the entire cluster to read-only mode.

**Correct answer:** A

**Explanation:** Databases in a cluster share server resources; resource contention can affect otherwise unrelated workloads.

**Slide reference:** PDF p. 7 (*Storage hierarchy*).

---

## Q17 · `db-s2-006`

**Question:** What does a line pointer in a heap page primarily identify?

A. The offset and status information for an item on that page.
B. The primary key of a row in an external index.
C. The file path containing an entire database.
D. The foreign-key relationship for a tuple.

**Correct answer:** A

**Explanation:** The lecture describes four-byte Item Pointers that locate tuples within a Page.

**Slide reference:** PDF p. 10 (*Page anatomy*).

---

## Q18 · `db-s2-008`

**Question:** Why should ctid not be used as a permanent identifier for a business record?

A. The ctid is always identical across every table in a cluster.
B. PostgreSQL never assigns ctid values to ordinary heap rows.
C. Updates and table rewrites can change a tuple's physical location.
D. The ctid stores a fixed UUID rather than a disk address.

**Correct answer:** C

**Explanation:** A ctid identifies a physical location. MVCC can create a new tuple version on UPDATE, so a permanent business identifier should not depend on this location.

**Slide reference:** PDF p. 11 (*Heap and TID*).

---

## Q19 · `db-s2-011`

**Question:** Why can heavy UPDATE and DELETE activity inflate a heap table?

A. Updates automatically double the size of every 8 KB page.
B. All deleted tuples become permanent primary-key index entries.
C. PostgreSQL stores each row in a separate operating-system file.
D. Dead tuple versions and fragmented space may accumulate before cleanup.

**Correct answer:** D

**Explanation:** Repeated UPDATE and DELETE activity creates obsolete row versions, contributing to fragmentation and bloat before cleanup.

**Slide reference:** PDF p. 8 (*Heap and MVCC*).

---

## Q20 · `db-s2-014`

**Question:** A table stores a 1 MB document in a text-like column. What is a likely storage approach?

A. PostgreSQL can compress eligible data and store oversized attributes outside the main heap row.
B. PostgreSQL expands the default Page size to fit the document in one Page.
C. The document must be split manually into several ordinary application rows.
D. A B-Tree index directly replaces TOAST for storing a megabyte document.

**Correct answer:** A

**Explanation:** The lecture describes compressing large attributes and storing them in a separate TOAST table if necessary, leaving a pointer in the original row.

**Slide reference:** PDF p. 12 (*TOAST*).

---

## Q21 · `db-s2-016`

**Question:** Which trade-off is associated with creating an additional ordinary index?

A. Faster inserts because no index pages need to be changed.
B. Guaranteed faster execution for every query on the table.
C. Faster eligible lookups at the cost of space and write maintenance.
D. Less disk usage because the index replaces the heap file.

**Correct answer:** C

**Explanation:** Indexes accelerate some reads but consume storage and must be maintained as data changes.

**Slide reference:** PDF p. 14 (*Index fundamentals*).

---

## Q22 · `db-s2-017`

**Question:** Which query is a natural candidate for a B-Tree index on price?

A. SELECT * FROM products WHERE metadata @> '{"tag":"sale"}';
B. SELECT * FROM products WHERE price BETWEEN 100 AND 200;
C. SELECT * FROM locations WHERE coordinates && search_box;
D. SELECT * FROM documents WHERE tokens @@ text_query;

**Correct answer:** B

**Explanation:** B-Tree supports ordered comparison predicates including equality, ranges and sorted output; JSON, spatial and text operators often use specialized indexes.

**Slide reference:** PDF p. 15 (*B-Tree*).

---

## Q23 · `db-s2-018`

**Question:** What is the usual B-Tree search sequence for an indexed heap lookup?

A. Root → internal pages → leaf containing TID → heap tuple.
B. Heap page → root → buffer pool → WAL record.
C. Hash bucket → JSON token → root → tuple.
D. TOAST chunk → leaf → database directory → heap.

**Correct answer:** A

**Explanation:** B-Tree navigation follows separator keys to a leaf and ordinarily retrieves a heap tuple through the stored TID.

**Slide reference:** PDF p. 16 (*B-Tree*).

---

## Q24 · `db-s2-020`

**Question:** A query filters email = 'x@example.com' and then sorts by price. What is true of an index only on email?

A. It automatically sorts the output by every column in the table.
B. It cannot be considered because email stores text rather than integers.
C. It may help the equality lookup but does not inherently satisfy ORDER BY price.
D. It always produces an index-only scan with no heap visibility checks.

**Correct answer:** C

**Explanation:** An index on email helps locate matching emails, but ORDER BY price refers to a different column and is not automatically satisfied by email ordering.

**Slide reference:** PDF p. 15 (*B-Tree*).

---

## Q25 · `db-s2-021`

**Question:** What does a PostgreSQL Hash index fundamentally use to organize searches?

A. Lexicographically ordered leaf nodes for range scans.
B. Hash values assigned to buckets for equality comparisons.
C. Geometric bounding boxes for nearest-neighbor traversal.
D. An inverted posting list for each JSON document token.

**Correct answer:** B

**Explanation:** Hash indexes are designed for equality predicates based on hash values and do not supply ordered range traversal.

**Slide reference:** PDF p. 17 (*Hash index*).

---

## Q26 · `db-s2-024`

**Question:** What does it mean that GiST can support lossy indexing?

A. GiST always stores full heap tuples in every internal node.
B. GiST cannot handle any spatial predicate exactly.
C. Some indexed representations are lossy and may return candidates requiring verification.
D. All GiST indexes use UUID hashes for query ordering.

**Correct answer:** C

**Explanation:** Lossy representations can admit candidate matches that require checking against the actual data. The lecture introduces this as a GiST capability without requiring implementation details.

**Slide reference:** PDF p. 18 (*GiST*).

---

## Q27 · `db-s2-026`

**Question:** Which SQL creates a GIN index over a JSONB metadata column?

A. CREATE INDEX idx_meta ON events USING GIN (metadata);
B. CREATE INDEX idx_meta ON events USING HASH (metadata);
C. CLUSTER events USING GIN (metadata);
D. CREATE INDEX idx_meta ON events INCLUDE (metadata);

**Correct answer:** A

**Explanation:** GIN is specified with USING GIN; the index supports JSONB operators depending on the chosen operator class.

**Slide reference:** PDF p. 19 (*GIN*).

---

## Q28 · `db-s2-027`

**Question:** For a GIN-indexed JSONB column, which filter matches the containment use case from the slide?

A. WHERE metadata BETWEEN 'a' AND 'z'
B. WHERE metadata LIKE 'active%'
C. WHERE metadata IS DISTINCT FROM 12
D. WHERE metadata @> '{"status":"active"}'

**Correct answer:** D

**Explanation:** The JSONB @> operator asks whether the left document contains the specified right-hand structure.

**Slide reference:** PDF p. 19 (*GIN*).

---

## Q29 · `db-s2-029`

**Question:** A PostgreSQL table already has three indexes. What is generally permitted?

A. The third index must be removed before another index can be created.
B. More indexes are possible, with additional disk and write-maintenance costs.
C. The heap must be permanently ordered by the newest index.
D. Creating a fourth index implicitly replaces the first index.

**Correct answer:** B

**Explanation:** PostgreSQL stores table rows in a heap and permits multiple non-clustered indexes; each costs disk space and write maintenance.

**Slide reference:** PDF p. 20 (*Clustered vs nonclustered*).

---

## Q30 · `db-s2-030`

**Question:** What does CLUSTER film USING idx_film_title do?

A. Physically rewrites the heap in the order of the selected index at that time.
B. Enables automatic heap reordering after every new INSERT.
C. Converts idx_film_title into a permanent unique constraint.
D. Changes the table into a permanently index-organized B-Tree.

**Correct answer:** A

**Explanation:** PostgreSQL CLUSTER is a one-time heap reorganization, not an always-maintained clustered-index structure.

**Slide reference:** PDF p. 21 (*CLUSTER*).

---

## Q31 · `db-s2-031`

**Question:** What is expected after many new inserts into a previously CLUSTERed table?

A. Future inserts are guaranteed to preserve the existing sorted order.
B. The heap automatically rejects any row not in the original range.
C. The selected index no longer works for lookups until CLUSTER runs again.
D. Physical ordering can deteriorate and clustering may need to be repeated.

**Correct answer:** D

**Explanation:** The CLUSTER slide states that physical reordering is one-time, and new INSERT operations gradually disrupt the ordering.

**Slide reference:** PDF p. 21 (*CLUSTER*).

---

## Q32 · `db-s2-033`

**Question:** Which maintenance command routinely helps reclaim reusable space associated with dead tuples?

A. DROP DATABASE keeps all indexes while deleting dead row versions.
B. VACUUM helps clean dead tuples and reusable heap/index space.
C. SELECT COUNT(*) physically compacts every index in the relation.
D. SET enable_seqscan = off reclaims deleted tuples from heap pages.

**Correct answer:** B

**Explanation:** VACUUM is introduced as the mechanism for reclaiming space from dead tuples in Heap Files and indexes.

**Slide reference:** PDF p. 22 (*Index maintenance*).

---

## Q33 · `db-s2-034`

**Question:** Which maintenance operation is listed for addressing an index that has grown too large?

A. REINDEX rebuilds the index from table contents.
B. ANALYZE always rewrites the entire index from scratch.
C. CHECKPOINT merges all live and dead index records into heap.
D. ORDER BY permanently compacts every leaf page of the index.

**Correct answer:** A

**Explanation:** The best-practices slide recommends REINDEX or VACUUM FULL when bloat becomes excessive. REINDEX is the operation that rebuilds an index; this question asks only for that distinction.

**Slide reference:** PDF p. 30 (*Index maintenance*).

---

## Q34 · `db-s2-036`

**Question:** A table has 10 million rows but only 10,000 pending orders. What is the partial-index advantage?

A. A Partial Index physically reorders all 10 million rows.
B. It eliminates the need to specify a WHERE clause at query time.
C. It keeps entries for the qualifying pending subset rather than every row.
D. It stores pending rows outside the table as a separate database.

**Correct answer:** C

**Explanation:** Partial indexes cover a defined subset; the slide's illustrative comparison is 10,000 vs 10 million entries.

**Slide reference:** PDF p. 24 (*Partial index*).

---

## Q35 · `db-s2-037`

**Question:** Which definition correctly indexes only active unreturned rentals?

A. CREATE INDEX idx_active ON rental (inventory_id) ORDER BY return_date IS NULL;
B. CREATE INDEX idx_active ON rental (inventory_id) WHERE return_date IS NULL;
C. CREATE INDEX idx_active ON rental USING HASH (inventory_id) WHERE return_date IS NOT NULL;
D. CREATE INDEX idx_active ON rental (return_date) WHERE inventory_id IS NULL;

**Correct answer:** B

**Explanation:** A partial B-Tree is declared by a normal CREATE INDEX with a predicate after the key-column list.

**Slide reference:** PDF p. 24 (*Partial index*).

---

## Q36 · `db-s2-038`

**Question:** For a partial index defined with WHERE status = 'pending', which query explicitly includes the same status condition?

A. SELECT * FROM orders WHERE status = 'pending' AND customer_id = 7;
B. SELECT * FROM orders WHERE status = 'shipped' AND customer_id = 7;
C. SELECT * FROM orders WHERE customer_id = 7;
D. SELECT * FROM orders WHERE status IS NOT NULL;

**Correct answer:** A

**Explanation:** The lecture says that the query WHERE condition must match the partial-index predicate. The pending filter is explicitly present only in option A; this makes the indexed subset relevant, not index usage guaranteed.

**Slide reference:** PDF p. 25 (*Partial index*).

---

## Q37 · `db-s2-040`

**Question:** Given 10,000 indexed rows from 10 million total, what fraction is indexed?

A. 1% of all rows.
B. 0.01% of all rows.
C. 0.1% of all rows.
D. 10% of all rows.

**Correct answer:** C

**Explanation:** 10,000 / 10,000,000 = 0.001 = 0.1%; this approximates the fraction of rows contributing partial-index entries.

**Slide reference:** PDF p. 25 (*Partial index practice*).

---

## Q38 · `db-s2-041`

**Question:** An index grows by 81,920 bytes. Under an 8 KB page-size assumption, how many pages is that?

A. 8 pages at 10,240 bytes per page.
B. 10 pages at 8,192 bytes per page.
C. 16 pages at 5,120 bytes per page.
D. 20 pages at 4,096 bytes per page.

**Correct answer:** B

**Explanation:** Under the stated 8 KB page assumption, 8 KB = 8192 bytes; 81920 / 8192 = 10 pages.

**Slide reference:** PDF p. 28 (*Storage practice*).

---

## Q39 · `db-s2-043`

**Question:** An index is defined on (last_name, first_name). Which lookup naturally follows the leading-key rule?

A. WHERE first_name = 'An' with no other condition
B. WHERE salary > 1000 with no name condition
C. WHERE lower(first_name) = 'an' alone
D. WHERE last_name = 'Nguyen' AND first_name = 'An'

**Correct answer:** D

**Explanation:** The B-Tree is ordered first by last_name and then first_name; combining both leading keys yields a useful search interval.

**Slide reference:** PDF p. 26 (*Multicolumn index*).

---

## Q40 · `db-s2-044`

**Question:** Which query can generally exploit the leftmost prefix of (last_name, first_name)?

A. WHERE first_name = 'Binh'
B. WHERE city = 'Hanoi'
C. WHERE last_name = 'Tran'
D. WHERE length(first_name) > 2

**Correct answer:** C

**Explanation:** The lecture’s Leading Column Rule says the index is useful for last_name alone or both names; a first_name-only filter does not follow the leading key.

**Slide reference:** PDF p. 26 (*Multicolumn index*).

---

## Q41 · `db-s2-046`

**Question:** Which SQL creates a covering index with an included, non-key column?

A. CREATE INDEX idx_order ON orders (customer_id) INCLUDE (total);
B. CREATE INDEX idx_order ON orders (total) INCLUDE (customer_id);
C. CREATE INDEX idx_order ON orders (customer_id, total);
D. CREATE INDEX idx_order ON orders (customer_id) WHERE total IS NOT NULL;

**Correct answer:** A

**Explanation:** INCLUDE is introduced as storing extra data in index leaves to support Index Only Scan without requiring those columns as the index search keys.

**Slide reference:** PDF p. 30 (*Covering index*).

---

## Q42 · `db-s2-047`

**Question:** What is the purpose of INCLUDE in a covering index?

A. It forces the entire PostgreSQL heap to follow the included column order.
B. It disables all MVCC visibility checks for the relation.
C. It guarantees faster queries even if all table pages fit in RAM.
D. A query may obtain selected columns from the index without fetching heap column values.

**Correct answer:** D

**Explanation:** INCLUDE stores extra columns in index leaves to make a covered Index Only Scan possible, helping avoid accesses to the Heap File when the plan can use it.

**Slide reference:** PDF p. 30 (*Covering index*).

---

## Q43 · `db-s2-049`

**Question:** What is the basic distinction between pg_table_size and pg_indexes_size?

A. Both report only the number of currently visible SQL rows.
B. The first measures table-associated storage; the second measures its indexes.
C. The first returns CPU cost while the second returns disk latency.
D. Both always produce the same size for each indexed relation.

**Correct answer:** B

**Explanation:** The table-size lab distinguishes pg_table_size (table-associated data) and pg_indexes_size (indexes), with pg_total_relation_size measuring their combined footprint.

**Slide reference:** PDF p. 27 (*Size diagnostics*).

---

## Q44 · `db-s2-050`

**Question:** Which PostgreSQL expression directly reports total index bytes for the payment relation?

A. SELECT pg_indexes_size('payment');
B. SELECT pg_table_size('payment');
C. SELECT pg_relation_size('payment_date');
D. SELECT pg_size_pretty('payment');

**Correct answer:** A

**Explanation:** Lab 2 uses pg_indexes_size on payment to measure total index storage. pg_size_pretty can format its byte count.

**Slide reference:** PDF p. 28 (*Size diagnostics*).

---

## Q45 · `db-s2-051`

**Question:** If pg_indexes_size('payment') rises after CREATE INDEX, what is the strongest conclusion?

A. All SELECT statements are now forced to choose the new index.
B. The table must have reduced its heap storage by exactly the added bytes.
C. The count of logical rows must have risen as the index was created.
D. The indexes now consume more disk space, by the before/after difference.

**Correct answer:** D

**Explanation:** Creating an index allocates index pages; before/after sizes indicate storage overhead, not a guaranteed planner decision.

**Slide reference:** PDF p. 28 (*Size diagnostics*).

---

## Q46 · `db-s2-052`

**Question:** The marketing team repeatedly filters replacement_cost > 25. Which partial index matches the stated workload?

A. CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost < 25;
B. CREATE INDEX idx_expensive ON film (title) WHERE title IS NULL;
C. CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost > 25;
D. CREATE INDEX idx_expensive ON film USING HASH (replacement_cost);

**Correct answer:** C

**Explanation:** An index restricted to cost > 25 covers the target expensive-film subset and supports that predicate when the optimizer chooses it.

**Slide reference:** PDF p. 29 (*Partial index practice*).

---

## Q47 · `db-s2-053`

**Question:** A query reads most rows in a small table even though an index exists. Which access strategy may still be reasonable?

A. An index scan is mandatory whenever any index exists.
B. A sequential scan because visiting a few heap pages may be cheaper.
C. An index-only scan even if the selected columns are not indexed.
D. A CLUSTER rewrite before evaluating the SELECT statement.

**Correct answer:** B

**Explanation:** The slide contrasts an index with a Sequential Scan and emphasizes the overhead of extra page accesses. When nearly all rows are required, scanning the table can be reasonable; an index does not guarantee its use.

**Slide reference:** PDF p. 14 (*Index selection*).

---

## Q48 · `db-s2-055`

**Question:** Which index is best matched to a login email that must be unique?

A. A GiST index over geographical coordinates.
B. A GIN index over JSON metadata tokens.
C. A nonunique Hash index on an unrelated status.
D. A UNIQUE B-Tree index on the email column.

**Correct answer:** D

**Explanation:** The Index Selection Cheat Sheet recommends a unique B-Tree for a unique login email, combining equality lookup with duplicate prevention.

**Slide reference:** PDF p. 31 (*Index selection*).

---

## Q49 · `db-s2-057`

**Question:** A workload repeatedly tests ARRAY membership and JSONB containment. Which indexing family is most appropriate?

A. Hash, because buckets retain array element ordering.
B. GIN, using suitable operator classes for the indexed data.
C. B-Tree on the number of items in each array only.
D. CLUSTER, because it automatically tokenizes JSONB documents.

**Correct answer:** B

**Explanation:** GIN maps component values to posting lists of matching rows and supports appropriate array/JSONB searches.

**Slide reference:** PDF p. 31 (*Index selection*).

---

## Q50 · `db-s2-058`

**Question:** Which statement best characterizes the Index Only Scan benefit introduced in the slide?

A. It may return selected values from index leaves instead of fetching those values from the Heap File.
B. It physically orders the Heap File by an included non-key column.
C. It removes the need for separate index storage on disk.
D. It requires creating a Hash index for every included column.

**Correct answer:** A

**Explanation:** The slide states that a covering index uses INCLUDE to provide additional data in index leaves and may avoid visiting the heap. It does not promise that every query will use an Index Only Scan.

**Slide reference:** PDF p. 30 (*Covering index*).

---

## Q51 · `db-s2-060`

**Question:** In a benchmark, an index occupies 220 MB while a partial index for the same target subset occupies 0.5 MB. What is the approximate size ratio?

A. The full index is about 44 times the partial index.
B. The full index is about 2,200 times the partial index.
C. The full index is about 440 times the partial index.
D. The full index is about 22 times the partial index.

**Correct answer:** C

**Explanation:** Using the slide's approximate figures, 220 / 0.5 = 440; real sizes depend on data and page overhead.

**Slide reference:** PDF p. 25 (*Partial index practice*).

---

## Q52 · `db-s2-061`

**Question:** If a hypothetical index contains 3 levels rather than scanning all 1 million rows, what is the appropriate conclusion?

A. The entire query always completes with precisely three disk reads.
B. A lookup follows a small number of tree levels, but heap I/O may still be needed.
C. The index stores exactly one million bytes in three pages.
D. The database always examines only three logical table rows.

**Correct answer:** B

**Explanation:** The B-Tree slide describes root-to-leaf traversal via a small number of levels, followed by a heap lookup using the TID.

**Slide reference:** PDF p. 16 (*B-Tree practice*).

---

## Q53 · `db-s2-063`

**Question:** What SQL syntax creates a conventional B-Tree index on replacement_cost?

A. CREATE INDEX idx_cost IN film VALUES (replacement_cost);
B. ADD INDEX idx_cost FROM film BY replacement_cost;
C. CLUSTER INDEX idx_cost ON film WHERE replacement_cost;
D. CREATE INDEX idx_cost ON film (replacement_cost);

**Correct answer:** D

**Explanation:** In PostgreSQL the default CREATE INDEX access method is B-Tree unless another method is specified.

**Slide reference:** PDF p. 21 (*B-Tree practice*).

---

## Q54 · `db-s2-064`

**Question:** In the table-size diagnostic query, what is the purpose of ORDER BY pg_total_relation_size(fed.oid) DESC?

A. List relation names alphabetically within the public schema.
B. Display the largest total relation footprints first.
C. Return only relations without any indexes.
D. Sort rows by the count of tuples stored in each relation.

**Correct answer:** B

**Explanation:** The lab orders public ordinary-table relations by total storage descending to identify large and index-heavy tables.

**Slide reference:** PDF p. 27 (*Lab 1*).

---

## Q55 · `db-s2-065`

**Question:** Which SQL correctly measures the on-disk size of one named index, idx_expensive_films?

A. SELECT pg_relation_size('idx_expensive_films');
B. SELECT pg_table_size('replacement_cost');
C. SELECT pg_indexes_size('replacement_cost');
D. SELECT pg_total_relation_size('film.title');

**Correct answer:** A

**Explanation:** Lab 3 asks for the size of the specific partial index. pg_relation_size on that index name gives its relation size, unlike pg_indexes_size which totals a table’s indexes.

**Slide reference:** PDF p. 29 (*Lab 3*).

---

## Q56 · `db-s2-066`

**Question:** For a B-Tree multicolumn index on staff(last_name, first_name), what is the primary key-ordering rule from the slide?

A. The tree is ordered by first_name and then last_name.
B. Columns are ordered by their data types, regardless of the index definition.
C. The tree is ordered by last_name first and then first_name.
D. Neither key participates in sorted index entries.

**Correct answer:** C

**Explanation:** Index entries are sorted by the first listed column, then the second within equal first-column values; that is why the leading column matters.

**Slide reference:** PDF p. 26 (*Multicolumn index*).

---

## Q57 · `db-s2-067`

**Question:** According to Lab 2, which CREATE INDEX statement is used to study index-size growth on payment?

A. CREATE INDEX idx_payment_date_long ON payment (payment_date);
B. CREATE INDEX idx_payment_date_long ON payment (amount, payment_date);
C. CREATE INDEX idx_payment_date_long ON payment (customer_id, payment_date);
D. CREATE INDEX idx_payment_date_long ON payment (payment_date, amount, customer_id);

**Correct answer:** D

**Explanation:** The exact Lab 2 index uses three payment columns. Students compare pg_indexes_size before and after creating it.

**Slide reference:** PDF p. 28 (*Lab 2*).

---
