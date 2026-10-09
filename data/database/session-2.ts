import type { Chapter } from "@/types/quiz";

// Physical Storage & Indexing Strategies, StudyHub session 2.
// 25 reviewed original quiz questions + 63 additional practice questions.
// Correct-answer index is zero-based. All questions have exactly 4 options.
// Includes prior-course recap questions present in the original quiz.

export const questions = [
  {
    "id": "db-s2-original-01",
    "question": "What is PostgreSQL's 'fail fast, fail early' integrity policy intended to achieve?",
    "options": [
      "Silently truncate values that exceed declared type constraints.",
      "Reconfigure SQL schemas whenever incoming values do not fit.",
      "Reject invalid values before they are durably accepted into the table.",
      "Automatically replace constraint violations with NULL values."
    ],
    "correctAnswer": 2,
    "explanation": "The lecture contrasts PostgreSQL's strict data checking with more permissive configurations; violating the schema should produce an error rather than silently corrupt data.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-02",
    "question": "According to the lecture, what is the full physical storage hierarchy?",
    "options": [
      "Database cluster → relation → database → page.",
      "Database cluster → database → relation → page.",
      "Database → relation → page → database cluster.",
      "Page → relation → database → database cluster."
    ],
    "correctAnswer": 1,
    "explanation": "The cluster contains databases, each contains relations, and a relation consists of physical pages.",
    "topic": "Original quiz · Storage hierarchy"
  },
  {
    "id": "db-s2-original-03",
    "question": "Why are UUIDs useful instead of predictable sequential integer IDs?",
    "options": [
      "They reduce guessable ID enumeration and support decentralized generation.",
      "They always occupy fewer bytes than four-byte integer keys.",
      "They automatically encrypt every column of the referenced row.",
      "They guarantee a faster ordered range scan than a B-Tree."
    ],
    "correctAnswer": 0,
    "explanation": "UUIDs are 128-bit identifiers useful across independent systems. They make sequential-ID guessing harder but never replace authorization checks.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-04",
    "question": "What is the default PostgreSQL data page size in a conventional build?",
    "options": [
      "4 KB per page, with a tuple always occupying half the page.",
      "16 KB per page, because each row must occupy a full block.",
      "32 KB per page, independently allocated for each tuple.",
      "8 KB per page, the basic storage and buffer-management unit."
    ],
    "correctAnswer": 3,
    "explanation": "The slide uses the standard 8 KB PostgreSQL default; block size can be altered when building PostgreSQL.",
    "topic": "Original quiz · Page anatomy"
  },
  {
    "id": "db-s2-original-05",
    "question": "How does the lecture characterize PostgreSQL's data integrity philosophy?",
    "options": [
      "Permissive type coercion without reporting any mismatch.",
      "Automatic conversion of malformed SQL into valid transactions.",
      "Strict validation against declared types and constraints.",
      "Mandatory removal of all foreign-key and CHECK constraints."
    ],
    "correctAnswer": 2,
    "explanation": "Strict validation helps detect incorrect input rather than allowing silent truncation or invalid persisted data.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-06",
    "question": "Which key technology underlies PostgreSQL's approach to concurrent row versions?",
    "options": [
      "Exclusive table locking for every ordinary SELECT.",
      "Multi-Version Concurrency Control, abbreviated MVCC.",
      "One global transaction permitted for an entire cluster.",
      "A single-threaded query engine that serializes all reads."
    ],
    "correctAnswer": 1,
    "explanation": "MVCC maintains different tuple versions so transactions can observe appropriate snapshots while many reads and writes proceed concurrently.",
    "topic": "Original quiz · Heap and MVCC"
  },
  {
    "id": "db-s2-original-07",
    "question": "In an ordinary PostgreSQL heap page, where is unused free space?",
    "options": [
      "Between item pointers expanding forward and tuples stored from the end.",
      "After the physical page boundary in a separate disk file.",
      "Inside the page header in the space used by the checksum.",
      "Before the first header byte at the start of the block."
    ],
    "correctAnswer": 0,
    "explanation": "The pointer array and heap tuples approach each other as the page fills; the gap is available insertion space.",
    "topic": "Original quiz · Page anatomy"
  },
  {
    "id": "db-s2-original-08",
    "question": "Which characteristic most accurately describes a B-Tree index?",
    "options": [
      "It hashes each key and loses support for ordered comparisons.",
      "It stores the entire clustered heap in each internal branch.",
      "It supports equality predicates but not range predicates.",
      "It is balanced, with leaf pages at a uniform tree depth."
    ],
    "correctAnswer": 3,
    "explanation": "A balanced B-Tree efficiently navigates sorted keys and supports equality, ordered predicates and range scans.",
    "topic": "Original quiz · B-Tree"
  },
  {
    "id": "db-s2-original-09",
    "question": "What is the core limitation of a Hash index versus a B-Tree?",
    "options": [
      "It cannot compare email strings for equality.",
      "It must always consume more space than every B-Tree.",
      "It supports equality lookup but not ordered range traversal.",
      "It requires all matching heap rows to be stored together."
    ],
    "correctAnswer": 2,
    "explanation": "Hash indexes use hashed keys for equality operators; ordered range comparisons require a different index method.",
    "topic": "Original quiz · Hash index"
  },
  {
    "id": "db-s2-original-10",
    "question": "For which workload is GiST a natural indexing framework?",
    "options": [
      "Only integer equality tests on primary-key sequences.",
      "Spatial relationships and supported nearest-neighbor operators.",
      "Physically clustering heap tuples by insertion time.",
      "Compressing oversized PDF values into TOAST chunks."
    ],
    "correctAnswer": 1,
    "explanation": "GiST supports extensible search strategies for geometric and related data through appropriate operator classes.",
    "topic": "Original quiz · GiST"
  },
  {
    "id": "db-s2-original-11",
    "question": "Which structure physically stores unordered PostgreSQL table tuples?",
    "options": [
      "A heap file with pages holding row versions.",
      "A unique B-Tree where every leaf stores full rows.",
      "A Hash index partitioned by primary key.",
      "A materialized view automatically ordered by ID."
    ],
    "correctAnswer": 0,
    "explanation": "A standard PostgreSQL relation uses heap storage and allows tuples in free locations rather than continuously sorting them.",
    "topic": "Original quiz · Heap and MVCC"
  },
  {
    "id": "db-s2-original-12",
    "question": "A PostgreSQL TID has the format (block number, offset). What does that mean?",
    "options": [
      "The relation's primary-key value and associated database port.",
      "The transaction's creation time and number of failed updates.",
      "The index type and ordinal number of its root page.",
      "A tuple's page and item-pointer position within the heap."
    ],
    "correctAnswer": 3,
    "explanation": "TIDs locate physical tuple versions rather than durable logical identities.",
    "topic": "Original quiz · Heap and TID"
  },
  {
    "id": "db-s2-original-13",
    "question": "Which combination matches the slide's PostgreSQL design priorities?",
    "options": [
      "Exclusively simple reads, avoiding complex data structures.",
      "Replacing SQL entirely with key-value commands.",
      "Data integrity, extensibility, and advanced SQL capabilities.",
      "Discarding transaction guarantees to maximize writes."
    ],
    "correctAnswer": 2,
    "explanation": "The earlier lecture highlights strict schema validation, object-relational extensibility and SQL standards as PostgreSQL priorities.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-14",
    "question": "For which situation can PostgreSQL ARRAY be a reasonable modeling choice?",
    "options": [
      "A large collection of entities requiring independent foreign keys.",
      "A small, simple collection of related values such as tags.",
      "A replacement for every one-to-many relationship in the schema.",
      "A method for storing raw images as separate data pages."
    ],
    "correctAnswer": 1,
    "explanation": "ARRAY is convenient for simple compact lists, but relational side tables are preferable for complex associated records and integrity rules.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-15",
    "question": "What distinguishes a Materialized View from a regular View?",
    "options": [
      "It persists a query's result and usually requires a refresh for new data.",
      "It stores only the query text and never uses disk space for results.",
      "It necessarily refreshes itself after each base-table update.",
      "It prohibits JOIN and GROUP BY inside its query definition."
    ],
    "correctAnswer": 0,
    "explanation": "Materialized Views cache rows on disk; ordinary views store a query definition and evaluate it when referenced.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-16",
    "question": "What default approximate tuple-size target appears in the slide's TOAST explanation?",
    "options": [
      "Exactly 8 KB, with no compression below page size.",
      "Exactly 1 MB, which is the mandatory TOAST limit.",
      "Exactly 4 KB, fixed for all PostgreSQL builds.",
      "About 2 KB, with actual decisions depending on configuration."
    ],
    "correctAnswer": 3,
    "explanation": "The slide cites 2 KB as a typical threshold. TOAST behavior also depends on storage strategy and configured target.",
    "topic": "Original quiz · TOAST"
  },
  {
    "id": "db-s2-original-17",
    "question": "How many bits are contained in the standard UUID data type?",
    "options": [
      "64 bits in a compact sequence counter.",
      "256 bits in a cryptographic digest value.",
      "128 bits in a universally unique identifier.",
      "32 bits in a standard signed SQL integer."
    ],
    "correctAnswer": 2,
    "explanation": "UUID stores 128 bits (16 bytes), compared with four bytes for a typical INTEGER.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-18",
    "question": "When an MVCC-updated row receives a new value, what happens in heap storage?",
    "options": [
      "The prior tuple is overwritten and immediately loses all snapshot visibility.",
      "A new tuple version is created instead of blindly overwriting the previous one.",
      "PostgreSQL deletes the whole table page and recreates its index.",
      "The update becomes a new database in the same server cluster."
    ],
    "correctAnswer": 1,
    "explanation": "Multiple row versions underpin MVCC; earlier versions may remain visible to suitable transactions until reclamation.",
    "topic": "Original quiz · Heap and MVCC"
  },
  {
    "id": "db-s2-original-19",
    "question": "What bulk-loading sequence is recommended in the lecture when operationally safe?",
    "options": [
      "Build secondary indexes after loading the large data batch.",
      "Add a new secondary index after every imported tuple.",
      "Run CLUSTER for every INSERT before creating any table.",
      "Disable all integrity constraints permanently for the database."
    ],
    "correctAnswer": 0,
    "explanation": "Loading first and creating secondary indexes afterward avoids repeated maintenance during large imports; do not casually drop essential production constraints.",
    "topic": "Original quiz · Bulk loading"
  },
  {
    "id": "db-s2-original-20",
    "question": "How does a regular View differ from a stored query-result cache?",
    "options": [
      "The view always keeps a separately materialized copy of every row.",
      "The view stores a fixed snapshot from the moment it is created.",
      "The view automatically becomes a physical clustered table.",
      "The view retains a query definition and computes its result when queried."
    ],
    "correctAnswer": 3,
    "explanation": "Ordinary views are stored SQL definitions; materialized views hold persisted query results and can become stale.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-21",
    "question": "Which SQL:2023 compliance count does the first lecture explicitly report?",
    "options": [
      "179 of 179 mandatory core features.",
      "100 of 160 mandatory core features.",
      "160 of 179 mandatory core features.",
      "79 of 160 mandatory core features."
    ],
    "correctAnswer": 2,
    "explanation": "This is a lecture-specific factual claim from the PostgreSQL introduction slide, not a substitute for checking the current standards matrix.",
    "topic": "Original quiz · Course recap"
  },
  {
    "id": "db-s2-original-22",
    "question": "According to the index-maintenance slides, what can contribute to index bloat?",
    "options": [
      "Choosing a B-Tree instead of Hash by itself.",
      "Dead index entries persisting after row updates or deletions.",
      "Enabling TOAST compression for large text values.",
      "Returning fewer rows than expected from a SELECT."
    ],
    "correctAnswer": 1,
    "explanation": "Dead tuples and index-version churn can leave underutilized index pages; VACUUM and sometimes REINDEX address bloat.",
    "topic": "Original quiz · Index maintenance"
  },
  {
    "id": "db-s2-original-23",
    "question": "Which use case best fits a Generalized Inverted Index (GIN)?",
    "options": [
      "Mapping JSONB/array components to potentially many matching rows.",
      "Returning rows by a conventional numeric sort key only.",
      "Physically moving all heap tuples to primary-key order.",
      "Locating one tuple through an individual transaction number."
    ],
    "correctAnswer": 0,
    "explanation": "GIN maps searchable component keys to matching posting lists and suits multivalued content.",
    "topic": "Original quiz · GIN"
  },
  {
    "id": "db-s2-original-24",
    "question": "Why should AI pipelines care about data movement from disk?",
    "options": [
      "Every disk read is faster than equivalent RAM access by several orders.",
      "Storing vectors in columns automatically eliminates all disk I/O.",
      "Page-level locality is irrelevant once a model has been trained.",
      "Disk access can be orders of magnitude slower than RAM and leave compute units waiting."
    ],
    "correctAnswer": 3,
    "explanation": "Poor layout and oversized reads can make storage I/O the bottleneck even if the model's computation is fast.",
    "topic": "Original quiz · Storage and I/O"
  },
  {
    "id": "db-s2-original-25",
    "question": "What best compares conventional PostgreSQL heap indexing with InnoDB's clustered primary index?",
    "options": [
      "Both databases always store all table tuples in secondary-index leaves.",
      "PostgreSQL keeps the heap automatically ordered by primary-key value.",
      "PostgreSQL stores heap tuples separately and index entries point to TIDs.",
      "InnoDB primary-key leaves store only TIDs into an unordered heap."
    ],
    "correctAnswer": 2,
    "explanation": "InnoDB's clustered primary index holds row data in leaves; PostgreSQL normally uses separate heap tuples and nonclustered indexes.",
    "topic": "Original quiz · Clustered vs nonclustered"
  },
  {
    "id": "db-s2-001",
    "question": "Why can page locality matter more than the number of rows returned?",
    "options": [
      "Every PostgreSQL query scans all rows regardless of its predicate.",
      "Reading 10 pages can require less disk I/O than reading 100 scattered pages.",
      "Disk I/O cost is determined exclusively by output row count.",
      "A page contains exactly one tuple in PostgreSQL."
    ],
    "correctAnswer": 1,
    "explanation": "PostgreSQL transfers storage pages rather than individual disk tuples, so fewer page accesses often matter more than fewer rows.",
    "topic": "Storage and I/O"
  },
  {
    "id": "db-s2-002",
    "question": "A PostgreSQL cluster hosts app_db, analytics_db, and ai_db. What is a plausible effect of a heavy analytics scan?",
    "options": [
      "The scan may compete with the other databases for shared memory and disk I/O.",
      "Each database has a completely isolated CPU and buffer pool.",
      "A scan can access only CPU cycles reserved for its own database.",
      "The scan automatically converts the entire cluster to read-only mode."
    ],
    "correctAnswer": 0,
    "explanation": "Databases in a cluster share server resources; resource contention can affect otherwise unrelated workloads.",
    "topic": "Storage hierarchy"
  },
  {
    "id": "db-s2-003",
    "question": "Which hierarchy correctly describes a PostgreSQL installation down to its I/O blocks?",
    "options": [
      "Cluster → relation → page → database.",
      "Page → relation → database → cluster.",
      "Database → cluster → page → relation.",
      "Cluster → database → relation → page."
    ],
    "correctAnswer": 3,
    "explanation": "One instance/cluster hosts databases; tables and indexes are relations composed of fixed-size pages.",
    "topic": "Storage hierarchy"
  },
  {
    "id": "db-s2-004",
    "question": "Under the default configuration, what happens when PostgreSQL needs a row not already cached?",
    "options": [
      "It transfers only the exact bytes occupied by the row.",
      "It reads all pages of the database into memory first.",
      "It fetches the containing 8 KB page into shared buffers.",
      "It creates a separate disk block for the selected row."
    ],
    "correctAnswer": 2,
    "explanation": "The page is the basic unit of PostgreSQL buffer management and I/O; the normal PostgreSQL build uses 8 KB pages.",
    "topic": "Page anatomy"
  },
  {
    "id": "db-s2-005",
    "question": "Where is the free-space region in a typical PostgreSQL heap page?",
    "options": [
      "Inside the page header before metadata fields.",
      "Between the line-pointer array and tuples growing from the end.",
      "Inside every tuple between its column values.",
      "After the last tuple beyond the end of the page."
    ],
    "correctAnswer": 1,
    "explanation": "Item pointers grow from the front; tuple data are placed from the end; available space lies between them.",
    "topic": "Page anatomy"
  },
  {
    "id": "db-s2-006",
    "question": "What does a line pointer in a heap page primarily identify?",
    "options": [
      "The offset and status information for an item on that page.",
      "The primary key of a row in an external index.",
      "The file path containing an entire database.",
      "The foreign-key relationship for a tuple."
    ],
    "correctAnswer": 0,
    "explanation": "The item identifier (line pointer) is normally four bytes and refers to the location/status of a page item.",
    "topic": "Page anatomy"
  },
  {
    "id": "db-s2-007",
    "question": "A row has ctid = (42,5). What does this represent?",
    "options": [
      "The primary-key value 42 and transaction ID 5.",
      "The database OID 42 and schema ID 5.",
      "The index height 42 and hash bucket 5.",
      "Its physical tuple location: block 42, item offset 5."
    ],
    "correctAnswer": 3,
    "explanation": "A TID/ctid identifies a tuple location with a block number and a line-pointer offset; it is not a permanent logical identifier.",
    "topic": "Heap and TID"
  },
  {
    "id": "db-s2-008",
    "question": "Why should application code avoid treating ctid as a stable business identifier?",
    "options": [
      "The ctid is always identical across every table in a cluster.",
      "PostgreSQL never assigns ctid values to ordinary heap rows.",
      "Updates and table rewrites can change a tuple's physical location.",
      "The ctid stores a fixed UUID rather than a disk address."
    ],
    "correctAnswer": 2,
    "explanation": "A new MVCC tuple version or operations such as VACUUM FULL/CLUSTER can alter physical tuple locations.",
    "topic": "Heap and TID"
  },
  {
    "id": "db-s2-009",
    "question": "What is the physical layout of a normal PostgreSQL table?",
    "options": [
      "A primary-key ordered B-Tree holding all row data.",
      "An unordered heap whose free space can be reused for inserts.",
      "An immutable append-only file with no page reuse.",
      "A hash-bucket list sorted by insertion timestamp."
    ],
    "correctAnswer": 1,
    "explanation": "PostgreSQL heap tables do not stay ordered by primary key or insertion time; new tuples are placed according to available space.",
    "topic": "Heap and MVCC"
  },
  {
    "id": "db-s2-010",
    "question": "What normally happens physically when an existing PostgreSQL row is updated?",
    "options": [
      "A new tuple version is written while the previous version may remain temporarily.",
      "The old tuple is always overwritten in place with no old version.",
      "The entire relation is dropped and rebuilt for the update.",
      "Every index is immediately converted into a hash index."
    ],
    "correctAnswer": 0,
    "explanation": "MVCC permits different transactions to see appropriate row versions; cleanup later removes dead versions.",
    "topic": "Heap and MVCC"
  },
  {
    "id": "db-s2-011",
    "question": "Why can heavy UPDATE and DELETE activity inflate a heap table?",
    "options": [
      "Updates automatically double the size of every 8 KB page.",
      "All deleted tuples become permanent primary-key index entries.",
      "PostgreSQL stores each row in a separate operating-system file.",
      "Dead tuple versions and fragmented space may accumulate before cleanup."
    ],
    "correctAnswer": 3,
    "explanation": "MVCC and deleted rows leave space to be reclaimed or reused; maintenance helps control table bloat.",
    "topic": "Heap and MVCC"
  },
  {
    "id": "db-s2-012",
    "question": "A tuple becomes too large for efficient in-page storage. Which mechanism addresses this?",
    "options": [
      "A Hash index automatically breaks the tuple into buckets.",
      "CLUSTER transforms the tuple into multiple logical rows.",
      "TOAST can compress suitable values and move them out-of-line.",
      "A primary key enlarges all heap pages to one megabyte."
    ],
    "correctAnswer": 2,
    "explanation": "TOAST manages large varlena attributes using compression and/or external TOAST storage, keeping heap tuples manageable.",
    "topic": "TOAST"
  },
  {
    "id": "db-s2-013",
    "question": "The slide says TOAST typically becomes relevant around which tuple-size target?",
    "options": [
      "Exactly 8 KB for every column of every table.",
      "About 2 KB, subject to storage settings and tuple layout.",
      "Exactly 1 MB before any compression can occur.",
      "Exactly 128 bits because a UUID sets the page limit."
    ],
    "correctAnswer": 1,
    "explanation": "The default TOAST target is commonly around 2 KB; it is a configurable heuristic, not a hard universal trigger.",
    "topic": "TOAST"
  },
  {
    "id": "db-s2-014",
    "question": "A table stores a 1 MB document in a text-like column. What is a likely storage approach?",
    "options": [
      "A small heap reference points to compressed or out-of-line TOAST chunks.",
      "The document is forced into a single default 8 KB heap page.",
      "All other records are deleted to make room for the document.",
      "The document becomes the root node of the table's B-Tree."
    ],
    "correctAnswer": 0,
    "explanation": "Large values can be represented in-row by a pointer to separately stored TOAST data after applicable compression.",
    "topic": "TOAST"
  },
  {
    "id": "db-s2-015",
    "question": "What is the main advantage of keeping wide values outside ordinary heap tuples?",
    "options": [
      "All columns can be indexed without consuming disk space.",
      "Every query avoids heap access even when selecting wide data.",
      "The database no longer needs MVCC versions during updates.",
      "Unrelated scans may move fewer bytes because heap rows remain narrower."
    ],
    "correctAnswer": 3,
    "explanation": "Small heap rows allow more tuples per page; fetching the large value when needed is a separate cost.",
    "topic": "TOAST"
  },
  {
    "id": "db-s2-016",
    "question": "Which trade-off is associated with creating an additional ordinary index?",
    "options": [
      "Faster inserts because no index pages need to be changed.",
      "Guaranteed faster execution for every query on the table.",
      "Faster eligible lookups at the cost of space and write maintenance.",
      "Less disk usage because the index replaces the heap file."
    ],
    "correctAnswer": 2,
    "explanation": "Indexes accelerate some reads but consume storage and must be maintained as data changes.",
    "topic": "Index fundamentals"
  },
  {
    "id": "db-s2-017",
    "question": "Which query is a natural candidate for a B-Tree index on price?",
    "options": [
      "SELECT * FROM products WHERE metadata @> '{\"tag\":\"sale\"}';",
      "SELECT * FROM products WHERE price BETWEEN 100 AND 200;",
      "SELECT * FROM locations WHERE coordinates && search_box;",
      "SELECT * FROM documents WHERE tokens @@ text_query;"
    ],
    "correctAnswer": 1,
    "explanation": "B-Tree supports ordered comparison predicates including equality, ranges and sorted output; JSON, spatial and text operators often use specialized indexes.",
    "topic": "B-Tree"
  },
  {
    "id": "db-s2-018",
    "question": "What is the usual B-Tree search sequence for an indexed heap lookup?",
    "options": [
      "Root → internal pages → leaf containing TID → heap tuple.",
      "Heap page → root → buffer pool → WAL record.",
      "Hash bucket → JSON token → root → tuple.",
      "TOAST chunk → leaf → database directory → heap."
    ],
    "correctAnswer": 0,
    "explanation": "B-Tree navigation follows separator keys to a leaf and ordinarily retrieves a heap tuple through the stored TID.",
    "topic": "B-Tree"
  },
  {
    "id": "db-s2-019",
    "question": "What property keeps B-Tree lookup depth predictable as the table grows?",
    "options": [
      "Every key is located in the root page of the index.",
      "The number of levels always equals the number of tuples.",
      "All leaves must be stored in one heap page regardless of size.",
      "The tree remains balanced and its leaves occur at the same level."
    ],
    "correctAnswer": 3,
    "explanation": "Balanced height gives logarithmic search behavior; PostgreSQL B-Trees usually have relatively small height.",
    "topic": "B-Tree"
  },
  {
    "id": "db-s2-020",
    "question": "A query filters email = 'x@example.com' and then sorts by price. What is true of an index only on email?",
    "options": [
      "It automatically sorts the output by every column in the table.",
      "It cannot be considered because email stores text rather than integers.",
      "It may help the equality lookup but does not inherently satisfy ORDER BY price.",
      "It always produces an index-only scan with no heap visibility checks."
    ],
    "correctAnswer": 2,
    "explanation": "An email index orders its own key; sorting by a different field may still require an explicit sort.",
    "topic": "B-Tree"
  },
  {
    "id": "db-s2-021",
    "question": "What does a PostgreSQL Hash index fundamentally use to organize searches?",
    "options": [
      "Lexicographically ordered leaf nodes for range scans.",
      "Hash values assigned to buckets for equality comparisons.",
      "Geometric bounding boxes for nearest-neighbor traversal.",
      "An inverted posting list for each JSON document token."
    ],
    "correctAnswer": 1,
    "explanation": "Hash indexes are designed for equality predicates based on hash values and do not supply ordered range traversal.",
    "topic": "Hash index"
  },
  {
    "id": "db-s2-022",
    "question": "Which operation is not directly supported by a Hash index's access method?",
    "options": [
      "Producing rows ordered by the indexed key for ORDER BY.",
      "Looking up a row whose indexed key equals a constant.",
      "Finding matching hash buckets for an equality predicate.",
      "Using a hash function as part of the index lookup."
    ],
    "correctAnswer": 0,
    "explanation": "Hash index order follows hash codes, not the key's sort order; B-Tree is appropriate for ordered scans.",
    "topic": "Hash index"
  },
  {
    "id": "db-s2-023",
    "question": "A map application searches for points within a polygon. Which index family is a natural choice?",
    "options": [
      "A Hash index on the text representation of each point.",
      "A standard B-Tree on the row's insertion timestamp.",
      "An INCLUDE-only index without a search key.",
      "GiST with an appropriate spatial operator class."
    ],
    "correctAnswer": 3,
    "explanation": "GiST can support spatial operator classes such as those used with PostGIS, including bounding-box and geometric searches.",
    "topic": "GiST"
  },
  {
    "id": "db-s2-024",
    "question": "Why may a GiST scan need to recheck candidate geometries?",
    "options": [
      "GiST always stores full heap tuples in every internal node.",
      "GiST cannot handle any spatial predicate exactly.",
      "Some indexed representations are lossy and may return candidates requiring verification.",
      "All GiST indexes use UUID hashes for query ordering."
    ],
    "correctAnswer": 2,
    "explanation": "Lossy summaries can admit false-positive candidates; the original predicate must then be checked against the heap data.",
    "topic": "GiST"
  },
  {
    "id": "db-s2-025",
    "question": "Which workload most naturally benefits from a GIN index?",
    "options": [
      "Returning every row in the exact order of a numeric price key.",
      "Testing whether a JSONB document contains a specified key/value structure.",
      "Finding an integer's predecessor in a B-Tree leaf.",
      "Physically reordering all heap tuples by primary key."
    ],
    "correctAnswer": 1,
    "explanation": "GIN is an inverted index suited to composite values such as JSONB, arrays and text-search lexemes.",
    "topic": "GIN"
  },
  {
    "id": "db-s2-026",
    "question": "Which SQL creates a GIN index over a JSONB metadata column?",
    "options": [
      "CREATE INDEX idx_meta ON events USING GIN (metadata);",
      "CREATE INDEX idx_meta ON events USING HASH (metadata);",
      "CLUSTER events USING GIN (metadata);",
      "CREATE INDEX idx_meta ON events INCLUDE (metadata);"
    ],
    "correctAnswer": 0,
    "explanation": "GIN is specified with USING GIN; the index supports JSONB operators depending on the chosen operator class.",
    "topic": "GIN"
  },
  {
    "id": "db-s2-027",
    "question": "For a GIN-indexed JSONB column, which filter matches the containment use case from the slide?",
    "options": [
      "WHERE metadata BETWEEN 'a' AND 'z'",
      "WHERE metadata LIKE 'active%'",
      "WHERE metadata IS DISTINCT FROM 12",
      "WHERE metadata @> '{\"status\":\"active\"}'"
    ],
    "correctAnswer": 3,
    "explanation": "The JSONB @> operator asks whether the left document contains the specified right-hand structure.",
    "topic": "GIN"
  },
  {
    "id": "db-s2-028",
    "question": "In the slide's comparison, how does InnoDB's primary clustered index differ from PostgreSQL's ordinary heap plus index?",
    "options": [
      "Both engines store all physical rows inside every secondary-index leaf.",
      "PostgreSQL primary-key indexes enforce an automatically sorted heap layout.",
      "InnoDB primary-index leaves contain rows; PostgreSQL index entries usually point into a heap.",
      "InnoDB uses no leaf pages and stores only tuple IDs in memory."
    ],
    "correctAnswer": 2,
    "explanation": "For conventional InnoDB tables, clustered primary-key leaf entries hold rows; PostgreSQL heap tuples are separate from ordinary index entries.",
    "topic": "Clustered vs nonclustered"
  },
  {
    "id": "db-s2-029",
    "question": "A PostgreSQL table already has three indexes. What is generally permitted?",
    "options": [
      "The database prohibits any table from having a second index.",
      "More indexes may be added, but each has storage and write costs.",
      "A new index requires converting the heap into InnoDB layout.",
      "The third index replaces the previous primary-key definition."
    ],
    "correctAnswer": 1,
    "explanation": "Nonclustered indexing permits multiple indexes per heap relation; excessive indexing still has overhead.",
    "topic": "Clustered vs nonclustered"
  },
  {
    "id": "db-s2-030",
    "question": "What does CLUSTER film USING idx_film_title do?",
    "options": [
      "Physically rewrites the heap in the order of the selected index at that time.",
      "Enables automatic heap reordering after every new INSERT.",
      "Converts idx_film_title into a permanent unique constraint.",
      "Changes the table into a permanently index-organized B-Tree."
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL CLUSTER is a one-time heap reorganization, not an always-maintained clustered-index structure.",
    "topic": "CLUSTER"
  },
  {
    "id": "db-s2-031",
    "question": "What is expected after many new inserts into a previously CLUSTERed table?",
    "options": [
      "Future inserts are guaranteed to preserve the existing sorted order.",
      "The heap automatically rejects any row not in the original range.",
      "The selected index no longer works for lookups until CLUSTER runs again.",
      "Physical ordering can deteriorate and clustering may need to be repeated."
    ],
    "correctAnswer": 3,
    "explanation": "New and updated tuples are not continuously maintained in the CLUSTER order.",
    "topic": "CLUSTER"
  },
  {
    "id": "db-s2-032",
    "question": "What is the operational downside of adding many indexes to a write-heavy table?",
    "options": [
      "PostgreSQL can no longer perform any SELECT against the heap.",
      "The database silently changes every primary key to UUID.",
      "INSERT and UPDATE work can increase because affected indexes require maintenance.",
      "Rows become impossible to delete without rebuilding the whole server."
    ],
    "correctAnswer": 2,
    "explanation": "Each index is an additional persistent structure; maintenance raises write amplification and can increase bloat.",
    "topic": "Index maintenance"
  },
  {
    "id": "db-s2-033",
    "question": "Which maintenance command routinely helps reclaim reusable space associated with dead tuples?",
    "options": [
      "DROP DATABASE keeps all indexes while deleting dead row versions.",
      "VACUUM helps clean dead tuples and reusable heap/index space.",
      "SELECT COUNT(*) physically compacts every index in the relation.",
      "SET enable_seqscan = off reclaims deleted tuples from heap pages."
    ],
    "correctAnswer": 1,
    "explanation": "Regular VACUUM marks storage reusable and maintains visibility metadata; it normally does not shrink the table file back to the OS.",
    "topic": "Index maintenance"
  },
  {
    "id": "db-s2-034",
    "question": "A B-Tree remains severely bloated after repeated churn. Which operation rebuilds its physical structure?",
    "options": [
      "REINDEX rebuilds the index from table contents.",
      "ANALYZE always rewrites the entire index from scratch.",
      "CHECKPOINT merges all live and dead index records into heap.",
      "ORDER BY permanently compacts every leaf page of the index."
    ],
    "correctAnswer": 0,
    "explanation": "REINDEX reconstructs an index and can remove accumulated index bloat; VACUUM handles routine cleanup.",
    "topic": "Index maintenance"
  },
  {
    "id": "db-s2-035",
    "question": "What is a sound bulk-load strategy when indexes are not needed during ingestion?",
    "options": [
      "Create duplicate secondary indexes for every column before importing.",
      "Force each incoming row to run a separate CLUSTER command.",
      "Use a Hash index to replace the entire table and skip loading.",
      "Load the large batch before building secondary indexes, then analyze statistics."
    ],
    "correctAnswer": 3,
    "explanation": "Bulk building secondary indexes can be cheaper than maintaining them for millions of individual inserts; constraints and production needs may limit dropping existing indexes.",
    "topic": "Bulk loading"
  },
  {
    "id": "db-s2-036",
    "question": "A table has 10 million rows but only 10,000 pending orders. What is the partial-index advantage?",
    "options": [
      "It automatically stores every row in sorted physical heap order.",
      "It eliminates the need to evaluate the pending predicate anywhere.",
      "It stores entries only for qualifying pending rows, reducing size and maintenance.",
      "It changes all pending rows into separate PostgreSQL databases."
    ],
    "correctAnswer": 2,
    "explanation": "Partial indexes cover a defined subset; the slide's illustrative comparison is 10,000 vs 10 million entries.",
    "topic": "Partial index"
  },
  {
    "id": "db-s2-037",
    "question": "Which definition correctly indexes only active unreturned rentals?",
    "options": [
      "CREATE INDEX idx_active ON rental (inventory_id) ORDER BY return_date IS NULL;",
      "CREATE INDEX idx_active ON rental (inventory_id) WHERE return_date IS NULL;",
      "CREATE INDEX idx_active ON rental WHERE return_date IS NULL USING HASH (inventory_id);",
      "CREATE INDEX idx_active ON rental (inventory_id) INCLUDE WHERE return_date IS NULL;"
    ],
    "correctAnswer": 1,
    "explanation": "A partial B-Tree is declared by a normal CREATE INDEX with a predicate after the key-column list.",
    "topic": "Partial index"
  },
  {
    "id": "db-s2-038",
    "question": "An index is partial with WHERE status = 'pending'. Which query most clearly qualifies for its use?",
    "options": [
      "SELECT * FROM orders WHERE status = 'pending' AND customer_id = 7;",
      "SELECT * FROM orders WHERE status = 'shipped' AND customer_id = 7;",
      "SELECT * FROM orders WHERE customer_id = 7;",
      "SELECT * FROM orders WHERE status IS NOT NULL;"
    ],
    "correctAnswer": 0,
    "explanation": "The query predicate must imply the index predicate; pending is explicit here, whereas the other filters cannot guarantee membership.",
    "topic": "Partial index"
  },
  {
    "id": "db-s2-039",
    "question": "Why might a parameterized query WHERE status = $1 not use a status='pending' partial index in a generic plan?",
    "options": [
      "PostgreSQL bans bound parameters in all WHERE expressions.",
      "Partial indexes may never be used for equality conditions.",
      "Every prepared statement executes a full table rewrite first.",
      "The planner cannot assume an arbitrary parameter value implies the predicate."
    ],
    "correctAnswer": 3,
    "explanation": "A generic plan must work for different parameter values; without known implication it cannot rely on an index covering only pending rows.",
    "topic": "Partial index"
  },
  {
    "id": "db-s2-040",
    "question": "Given 10,000 indexed rows from 10 million total, what fraction is indexed?",
    "options": [
      "1% of all rows.",
      "0.01% of all rows.",
      "0.1% of all rows.",
      "10% of all rows."
    ],
    "correctAnswer": 2,
    "explanation": "10,000 / 10,000,000 = 0.001 = 0.1%; this approximates the fraction of rows contributing partial-index entries.",
    "topic": "Partial index practice"
  },
  {
    "id": "db-s2-041",
    "question": "An index grows by 81,920 bytes. Under an 8 KB page-size assumption, how many pages is that?",
    "options": [
      "8 pages at 10,240 bytes per page.",
      "10 pages at 8,192 bytes per page.",
      "16 pages at 5,120 bytes per page.",
      "20 pages at 4,096 bytes per page."
    ],
    "correctAnswer": 1,
    "explanation": "Divide 81,920 by 8,192 to obtain 10 logical 8 KB pages; allocated size may include index overhead.",
    "topic": "Storage practice"
  },
  {
    "id": "db-s2-042",
    "question": "For 1,000 matching rows stored within 10 heap pages versus 100 matching rows on 100 different pages, which statement is best?",
    "options": [
      "The first can require fewer heap page reads despite returning more rows.",
      "The second must always be faster because it returns fewer rows.",
      "Both cases always require exactly 100 disk block reads.",
      "Page locality has no impact once an index has been created."
    ],
    "correctAnswer": 0,
    "explanation": "With identical assumptions and no cache effects, accessing 10 pages may cost less I/O than accessing 100 scattered pages.",
    "topic": "Storage practice"
  },
  {
    "id": "db-s2-043",
    "question": "An index is defined on (last_name, first_name). Which lookup naturally follows the leading-key rule?",
    "options": [
      "WHERE first_name = 'An' with no other condition",
      "WHERE salary > 1000 with no name condition",
      "WHERE lower(first_name) = 'an' alone",
      "WHERE last_name = 'Nguyen' AND first_name = 'An'"
    ],
    "correctAnswer": 3,
    "explanation": "The B-Tree is ordered first by last_name and then first_name; combining both leading keys yields a useful search interval.",
    "topic": "Multicolumn index"
  },
  {
    "id": "db-s2-044",
    "question": "Which query can generally exploit the leftmost prefix of (last_name, first_name)?",
    "options": [
      "WHERE first_name = 'Binh'",
      "WHERE city = 'Hanoi'",
      "WHERE last_name = 'Tran'",
      "WHERE length(first_name) > 2"
    ],
    "correctAnswer": 2,
    "explanation": "Filtering the first index key yields a contiguous index range. PostgreSQL may still consider scans on nonleading keys in some circumstances, so 'never usable' is too absolute.",
    "topic": "Multicolumn index"
  },
  {
    "id": "db-s2-045",
    "question": "What is a limitation of the slide's recommendation to put the highest-cardinality column first?",
    "options": [
      "A multicolumn B-Tree can contain only columns with identical data types.",
      "Actual predicate patterns and ordering requirements also determine the best column order.",
      "B-Tree keys are always automatically sorted by the second column first.",
      "Cardinality completely determines index usage regardless of SQL predicates."
    ],
    "correctAnswer": 1,
    "explanation": "The leading-column access pattern is central; choose key order from equality/range predicates and common queries, not cardinality alone.",
    "topic": "Multicolumn index"
  },
  {
    "id": "db-s2-046",
    "question": "Which SQL creates a covering index with an included, non-key column?",
    "options": [
      "CREATE INDEX idx_order ON orders (customer_id) INCLUDE (total);",
      "CREATE INDEX idx_order ON orders INCLUDE (customer_id) KEY (total);",
      "CREATE INDEX idx_order ON orders (customer_id) WHERE INCLUDE (total);",
      "CREATE INDEX idx_order ON orders USING GIN INCLUDE customer_id,total;"
    ],
    "correctAnswer": 0,
    "explanation": "INCLUDE stores additional attributes in index leaf tuples while keeping them outside the search key ordering.",
    "topic": "Covering index"
  },
  {
    "id": "db-s2-047",
    "question": "Why can an INCLUDE index help an Index Only Scan?",
    "options": [
      "It forces the entire PostgreSQL heap to follow the included column order.",
      "It disables all MVCC visibility checks for the relation.",
      "It guarantees faster queries even if all table pages fit in RAM.",
      "A query may obtain selected columns from the index without fetching heap column values."
    ],
    "correctAnswer": 3,
    "explanation": "Index-only scans can return covered columns from the index, although visibility-map checks and heap visits may still be necessary.",
    "topic": "Covering index"
  },
  {
    "id": "db-s2-048",
    "question": "An index contains (customer_id) INCLUDE (total). Which statement is correct?",
    "options": [
      "total automatically becomes the first search key for all predicates.",
      "Both fields always become unique even without a UNIQUE clause.",
      "customer_id is a search key; total is payload available at index leaves.",
      "The table is permanently clustered by total and then customer_id."
    ],
    "correctAnswer": 2,
    "explanation": "INCLUDE attributes do not participate as ordinary ordered search keys; they help cover returned columns.",
    "topic": "Covering index"
  },
  {
    "id": "db-s2-049",
    "question": "What is the basic distinction between pg_table_size and pg_indexes_size?",
    "options": [
      "Both report only the number of currently visible SQL rows.",
      "The first measures table-associated storage; the second measures its indexes.",
      "The first returns CPU cost while the second returns disk latency.",
      "Both always produce the same size for each indexed relation."
    ],
    "correctAnswer": 1,
    "explanation": "These diagnostic functions distinguish table storage from index storage; pg_total_relation_size includes the associated total footprint.",
    "topic": "Size diagnostics"
  },
  {
    "id": "db-s2-050",
    "question": "Which PostgreSQL expression directly reports total index bytes for the payment relation?",
    "options": [
      "SELECT pg_indexes_size('payment');",
      "SELECT pg_table_size('payment');",
      "SELECT pg_relation_size('payment_date');",
      "SELECT pg_size_pretty('payment');"
    ],
    "correctAnswer": 0,
    "explanation": "pg_indexes_size(regclass) returns the aggregate size of indexes on a table; pg_size_pretty can format the resulting byte count.",
    "topic": "Size diagnostics"
  },
  {
    "id": "db-s2-051",
    "question": "If pg_indexes_size('payment') rises after CREATE INDEX, what is the strongest conclusion?",
    "options": [
      "PostgreSQL must now execute all SELECT queries with that index.",
      "The payment heap necessarily shrank by exactly the same amount.",
      "The number of payment rows automatically doubled at index creation.",
      "An additional index consumed persistent disk space; the difference quantifies growth."
    ],
    "correctAnswer": 3,
    "explanation": "Creating an index allocates index pages; before/after sizes indicate storage overhead, not a guaranteed planner decision.",
    "topic": "Size diagnostics"
  },
  {
    "id": "db-s2-052",
    "question": "The marketing team repeatedly filters replacement_cost > 25. Which partial index matches the stated workload?",
    "options": [
      "CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost < 25;",
      "CREATE INDEX idx_expensive ON film (title) WHERE title IS NULL;",
      "CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost > 25;",
      "CREATE INDEX idx_expensive ON film USING HASH (replacement_cost);"
    ],
    "correctAnswer": 2,
    "explanation": "An index restricted to cost > 25 covers the target expensive-film subset and supports that predicate when the optimizer chooses it.",
    "topic": "Partial index practice"
  },
  {
    "id": "db-s2-053",
    "question": "A query requests all rows from a tiny table despite a suitable index. What may the planner reasonably choose?",
    "options": [
      "An index scan is mandatory whenever any index exists.",
      "A sequential scan because visiting a few heap pages may be cheaper.",
      "An index-only scan even if the selected columns are not indexed.",
      "A CLUSTER rewrite before evaluating the SELECT statement."
    ],
    "correctAnswer": 1,
    "explanation": "Cost-based planning may prefer a sequential scan for small tables or low-selectivity queries; index presence is not a promise of index use.",
    "topic": "Index selection"
  },
  {
    "id": "db-s2-054",
    "question": "What does selectivity mean when evaluating an index predicate?",
    "options": [
      "How small a fraction of rows satisfy the filter.",
      "How many columns were included in the SELECT list.",
      "Whether the database cluster uses the default TCP port.",
      "The number of indexes that contain a UUID value."
    ],
    "correctAnswer": 0,
    "explanation": "A selective predicate returns relatively few rows; indexed access tends to help when it saves substantial heap page visits.",
    "topic": "Index selection"
  },
  {
    "id": "db-s2-055",
    "question": "Which index is best matched to a login email that must be unique?",
    "options": [
      "A GiST index over geographical coordinates.",
      "A GIN index over JSON metadata tokens.",
      "A nonunique Hash index on an unrelated status.",
      "A UNIQUE B-Tree index on the email column."
    ],
    "correctAnswer": 3,
    "explanation": "B-Tree unique enforcement both prevents duplicate indexed key values and supports equality email lookups.",
    "topic": "Index selection"
  },
  {
    "id": "db-s2-056",
    "question": "For a table of 10 million rows queried mainly by status='active' representing only 5%, what is a sensible design?",
    "options": [
      "A separate full B-Tree index for every text column.",
      "Permanent CLUSTER on status after every query.",
      "A partial index restricted to active rows if the workload matches.",
      "No index regardless of observed latency and query plans."
    ],
    "correctAnswer": 2,
    "explanation": "A partial index can focus on a repeatedly accessed subset, reducing storage versus indexing every row.",
    "topic": "Index selection"
  },
  {
    "id": "db-s2-057",
    "question": "A workload repeatedly tests ARRAY membership and JSONB containment. Which indexing family is most appropriate?",
    "options": [
      "Hash, because buckets retain array element ordering.",
      "GIN, using suitable operator classes for the indexed data.",
      "B-Tree on the number of items in each array only.",
      "CLUSTER, because it automatically tokenizes JSONB documents."
    ],
    "correctAnswer": 1,
    "explanation": "GIN maps component values to posting lists of matching rows and supports appropriate array/JSONB searches.",
    "topic": "Index selection"
  },
  {
    "id": "db-s2-058",
    "question": "When doing an Index Only Scan, what can still force a heap visit?",
    "options": [
      "A page without all-visible status may require an MVCC visibility check.",
      "The B-Tree must always load the entire heap relation into memory.",
      "PostgreSQL refuses to read INCLUDE columns from index leaves.",
      "The executor must update each row to create a fresh tuple version."
    ],
    "correctAnswer": 0,
    "explanation": "Index coverage is necessary but not sufficient; the visibility map tells whether heap checks can be skipped safely.",
    "topic": "Covering index"
  },
  {
    "id": "db-s2-059",
    "question": "Why do many overlapping indexes often harm overall database efficiency?",
    "options": [
      "They eliminate the cost of writes by replicating every tuple.",
      "They permanently guarantee optimal planner statistics without ANALYZE.",
      "They remove the need for buffer-cache page management.",
      "They consume space and create additional maintenance work on writes."
    ],
    "correctAnswer": 3,
    "explanation": "Every additional index consumes blocks and must stay synchronized with qualifying table changes.",
    "topic": "Index maintenance"
  },
  {
    "id": "db-s2-060",
    "question": "In a benchmark, an index occupies 220 MB while a partial index for the same target subset occupies 0.5 MB. What is the approximate size ratio?",
    "options": [
      "The full index is about 44 times the partial index.",
      "The full index is about 2,200 times the partial index.",
      "The full index is about 440 times the partial index.",
      "The full index is about 22 times the partial index."
    ],
    "correctAnswer": 2,
    "explanation": "Using the slide's approximate figures, 220 / 0.5 = 440; real sizes depend on data and page overhead.",
    "topic": "Partial index practice"
  },
  {
    "id": "db-s2-061",
    "question": "If a hypothetical index contains 3 levels rather than scanning all 1 million rows, what is the appropriate conclusion?",
    "options": [
      "The entire query always completes with precisely three disk reads.",
      "A lookup follows a small number of tree levels, but heap I/O may still be needed.",
      "The index stores exactly one million bytes in three pages.",
      "The database always examines only three logical table rows."
    ],
    "correctAnswer": 1,
    "explanation": "Tree height limits navigation steps; total I/O also depends on cached pages, qualifying entries and heap fetches.",
    "topic": "B-Tree practice"
  },
  {
    "id": "db-s2-062",
    "question": "Why is it reasonable to avoid an index on a very low-selectivity condition?",
    "options": [
      "Many matching tuples may require heap visits, making a sequential scan competitive.",
      "Low selectivity means exactly one matching row, so indexing cannot work.",
      "PostgreSQL forbids indexing columns containing repeated values.",
      "An index immediately changes repeated values to unique identifiers."
    ],
    "correctAnswer": 0,
    "explanation": "An index can still exist, but if most rows match, random heap access may cost more than scanning the table.",
    "topic": "Index selection"
  },
  {
    "id": "db-s2-063",
    "question": "What SQL syntax creates a conventional B-Tree index on replacement_cost?",
    "options": [
      "CREATE INDEX idx_cost IN film VALUES (replacement_cost);",
      "ADD INDEX idx_cost FROM film BY replacement_cost;",
      "CLUSTER INDEX idx_cost ON film WHERE replacement_cost;",
      "CREATE INDEX idx_cost ON film (replacement_cost);"
    ],
    "correctAnswer": 3,
    "explanation": "In PostgreSQL the default CREATE INDEX access method is B-Tree unless another method is specified.",
    "topic": "B-Tree practice"
  }
] as const;

export default questions;


// Adapt the supplied question format to the shared quiz components.
const optionIds = ["a", "b", "c", "d"];

export const session2: Chapter = {
    id: "session-2",
    title: "Session 2: Physical storage & indexing strategies",
    description: "88 câu hỏi về lưu trữ vật lý và chiến lược lập chỉ mục: 25 câu ôn tập gốc và 63 câu luyện tập bổ sung.",
    revision: 1,
    questions: questions.map((question) => ({
        id: question.id,
        prompt: question.question,
        options: question.options.map((text, index) => ({ id: optionIds[index], text })),
        correctOptionId: optionIds[question.correctAnswer],
        explanation: question.explanation,
    })),
};
