import type { Chapter } from "@/types/quiz";

// Physical Storage & Indexing Strategies, StudyHub session 2.
// 25 reviewed original quiz questions + 63 additional practice questions.
// Includes prior-course recap questions present in the original quiz.

export const session2: Chapter = {
  id: "session-2",
  title: "Session 2: Physical storage & indexing strategies",
  description: "88 câu hỏi về lưu trữ vật lý và chiến lược lập chỉ mục: 25 câu ôn tập gốc và 63 câu luyện tập bổ sung.",
  revision: 1,
  questions: [
    {
      id: "db-s2-original-01",
      prompt: "What is PostgreSQL's 'fail fast, fail early' integrity policy intended to achieve?",
      options: [
        {
          id: "a",
          text: "Silently truncate values that exceed declared type constraints.",
        },
        {
          id: "b",
          text: "Reconfigure SQL schemas whenever incoming values do not fit.",
        },
        {
          id: "c",
          text: "Reject invalid values before they are durably accepted into the table.",
        },
        {
          id: "d",
          text: "Automatically replace constraint violations with NULL values.",
        },
      ],
      correctOptionId: "c",
      explanation: "The lecture contrasts PostgreSQL's strict data checking with more permissive configurations; violating the schema should produce an error rather than silently corrupt data.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-02",
      prompt: "According to the lecture, what is the full physical storage hierarchy?",
      options: [
        {
          id: "a",
          text: "Database cluster → relation → database → page.",
        },
        {
          id: "b",
          text: "Database cluster → database → relation → page.",
        },
        {
          id: "c",
          text: "Database → relation → page → database cluster.",
        },
        {
          id: "d",
          text: "Page → relation → database → database cluster.",
        },
      ],
      correctOptionId: "b",
      explanation: "The cluster contains databases, each contains relations, and a relation consists of physical pages.",
      topic: "Original quiz · Storage hierarchy",
    },
    {
      id: "db-s2-original-03",
      prompt: "Why are UUIDs useful instead of predictable sequential integer IDs?",
      options: [
        {
          id: "a",
          text: "They reduce guessable ID enumeration and support decentralized generation.",
        },
        {
          id: "b",
          text: "They always occupy fewer bytes than four-byte integer keys.",
        },
        {
          id: "c",
          text: "They automatically encrypt every column of the referenced row.",
        },
        {
          id: "d",
          text: "They guarantee a faster ordered range scan than a B-Tree.",
        },
      ],
      correctOptionId: "a",
      explanation: "UUIDs are 128-bit identifiers useful across independent systems. They make sequential-ID guessing harder but never replace authorization checks.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-04",
      prompt: "What is the default PostgreSQL data page size in a conventional build?",
      options: [
        {
          id: "a",
          text: "4 KB per page, with a tuple always occupying half the page.",
        },
        {
          id: "b",
          text: "16 KB per page, because each row must occupy a full block.",
        },
        {
          id: "c",
          text: "32 KB per page, independently allocated for each tuple.",
        },
        {
          id: "d",
          text: "8 KB per page, the basic storage and buffer-management unit.",
        },
      ],
      correctOptionId: "d",
      explanation: "The slide uses the standard 8 KB PostgreSQL default; block size can be altered when building PostgreSQL.",
      topic: "Original quiz · Page anatomy",
    },
    {
      id: "db-s2-original-05",
      prompt: "How does the lecture characterize PostgreSQL's data integrity philosophy?",
      options: [
        {
          id: "a",
          text: "Permissive type coercion without reporting any mismatch.",
        },
        {
          id: "b",
          text: "Automatic conversion of malformed SQL into valid transactions.",
        },
        {
          id: "c",
          text: "Strict validation against declared types and constraints.",
        },
        {
          id: "d",
          text: "Mandatory removal of all foreign-key and CHECK constraints.",
        },
      ],
      correctOptionId: "c",
      explanation: "Strict validation helps detect incorrect input rather than allowing silent truncation or invalid persisted data.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-06",
      prompt: "Which key technology underlies PostgreSQL's approach to concurrent row versions?",
      options: [
        {
          id: "a",
          text: "Exclusive table locking for every ordinary SELECT.",
        },
        {
          id: "b",
          text: "Multi-Version Concurrency Control, abbreviated MVCC.",
        },
        {
          id: "c",
          text: "One global transaction permitted for an entire cluster.",
        },
        {
          id: "d",
          text: "A single-threaded query engine that serializes all reads.",
        },
      ],
      correctOptionId: "b",
      explanation: "MVCC maintains different tuple versions so transactions can observe appropriate snapshots while many reads and writes proceed concurrently.",
      topic: "Original quiz · Heap and MVCC",
    },
    {
      id: "db-s2-original-07",
      prompt: "In an ordinary PostgreSQL heap page, where is unused free space?",
      options: [
        {
          id: "a",
          text: "Between item pointers expanding forward and tuples stored from the end.",
        },
        {
          id: "b",
          text: "After the physical page boundary in a separate disk file.",
        },
        {
          id: "c",
          text: "Inside the page header in the space used by the checksum.",
        },
        {
          id: "d",
          text: "Before the first header byte at the start of the block.",
        },
      ],
      correctOptionId: "a",
      explanation: "The pointer array and heap tuples approach each other as the page fills; the gap is available insertion space.",
      topic: "Original quiz · Page anatomy",
    },
    {
      id: "db-s2-original-08",
      prompt: "Which characteristic most accurately describes a B-Tree index?",
      options: [
        {
          id: "a",
          text: "It hashes each key and loses support for ordered comparisons.",
        },
        {
          id: "b",
          text: "It stores the entire clustered heap in each internal branch.",
        },
        {
          id: "c",
          text: "It supports equality predicates but not range predicates.",
        },
        {
          id: "d",
          text: "It is balanced, with leaf pages at a uniform tree depth.",
        },
      ],
      correctOptionId: "d",
      explanation: "A balanced B-Tree efficiently navigates sorted keys and supports equality, ordered predicates and range scans.",
      topic: "Original quiz · B-Tree",
    },
    {
      id: "db-s2-original-09",
      prompt: "What is the core limitation of a Hash index versus a B-Tree?",
      options: [
        {
          id: "a",
          text: "It cannot compare email strings for equality.",
        },
        {
          id: "b",
          text: "It must always consume more space than every B-Tree.",
        },
        {
          id: "c",
          text: "It supports equality lookup but not ordered range traversal.",
        },
        {
          id: "d",
          text: "It requires all matching heap rows to be stored together.",
        },
      ],
      correctOptionId: "c",
      explanation: "Hash indexes use hashed keys for equality operators; ordered range comparisons require a different index method.",
      topic: "Original quiz · Hash index",
    },
    {
      id: "db-s2-original-10",
      prompt: "For which workload is GiST a natural indexing framework?",
      options: [
        {
          id: "a",
          text: "Only integer equality tests on primary-key sequences.",
        },
        {
          id: "b",
          text: "Spatial relationships and supported nearest-neighbor operators.",
        },
        {
          id: "c",
          text: "Physically clustering heap tuples by insertion time.",
        },
        {
          id: "d",
          text: "Compressing oversized PDF values into TOAST chunks.",
        },
      ],
      correctOptionId: "b",
      explanation: "GiST supports extensible search strategies for geometric and related data through appropriate operator classes.",
      topic: "Original quiz · GiST",
    },
    {
      id: "db-s2-original-11",
      prompt: "Which structure physically stores unordered PostgreSQL table tuples?",
      options: [
        {
          id: "a",
          text: "A heap file with pages holding row versions.",
        },
        {
          id: "b",
          text: "A unique B-Tree where every leaf stores full rows.",
        },
        {
          id: "c",
          text: "A Hash index partitioned by primary key.",
        },
        {
          id: "d",
          text: "A materialized view automatically ordered by ID.",
        },
      ],
      correctOptionId: "a",
      explanation: "A standard PostgreSQL relation uses heap storage and allows tuples in free locations rather than continuously sorting them.",
      topic: "Original quiz · Heap and MVCC",
    },
    {
      id: "db-s2-original-12",
      prompt: "A PostgreSQL TID has the format (block number, offset). What does that mean?",
      options: [
        {
          id: "a",
          text: "The relation's primary-key value and associated database port.",
        },
        {
          id: "b",
          text: "The transaction's creation time and number of failed updates.",
        },
        {
          id: "c",
          text: "The index type and ordinal number of its root page.",
        },
        {
          id: "d",
          text: "A tuple's page and item-pointer position within the heap.",
        },
      ],
      correctOptionId: "d",
      explanation: "TIDs locate physical tuple versions rather than durable logical identities.",
      topic: "Original quiz · Heap and TID",
    },
    {
      id: "db-s2-original-13",
      prompt: "Which combination matches the slide's PostgreSQL design priorities?",
      options: [
        {
          id: "a",
          text: "Exclusively simple reads, avoiding complex data structures.",
        },
        {
          id: "b",
          text: "Replacing SQL entirely with key-value commands.",
        },
        {
          id: "c",
          text: "Data integrity, extensibility, and advanced SQL capabilities.",
        },
        {
          id: "d",
          text: "Discarding transaction guarantees to maximize writes.",
        },
      ],
      correctOptionId: "c",
      explanation: "The earlier lecture highlights strict schema validation, object-relational extensibility and SQL standards as PostgreSQL priorities.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-14",
      prompt: "For which situation can PostgreSQL ARRAY be a reasonable modeling choice?",
      options: [
        {
          id: "a",
          text: "A large collection of entities requiring independent foreign keys.",
        },
        {
          id: "b",
          text: "A small, simple collection of related values such as tags.",
        },
        {
          id: "c",
          text: "A replacement for every one-to-many relationship in the schema.",
        },
        {
          id: "d",
          text: "A method for storing raw images as separate data pages.",
        },
      ],
      correctOptionId: "b",
      explanation: "ARRAY is convenient for simple compact lists, but relational side tables are preferable for complex associated records and integrity rules.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-15",
      prompt: "What distinguishes a Materialized View from a regular View?",
      options: [
        {
          id: "a",
          text: "It persists a query's result and usually requires a refresh for new data.",
        },
        {
          id: "b",
          text: "It stores only the query text and never uses disk space for results.",
        },
        {
          id: "c",
          text: "It necessarily refreshes itself after each base-table update.",
        },
        {
          id: "d",
          text: "It prohibits JOIN and GROUP BY inside its query definition.",
        },
      ],
      correctOptionId: "a",
      explanation: "Materialized Views cache rows on disk; ordinary views store a query definition and evaluate it when referenced.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-16",
      prompt: "What default approximate tuple-size target appears in the slide's TOAST explanation?",
      options: [
        {
          id: "a",
          text: "Exactly 8 KB, with no compression below page size.",
        },
        {
          id: "b",
          text: "Exactly 1 MB, which is the mandatory TOAST limit.",
        },
        {
          id: "c",
          text: "Exactly 4 KB, fixed for all PostgreSQL builds.",
        },
        {
          id: "d",
          text: "About 2 KB, with actual decisions depending on configuration.",
        },
      ],
      correctOptionId: "d",
      explanation: "The slide cites 2 KB as a typical threshold. TOAST behavior also depends on storage strategy and configured target.",
      topic: "Original quiz · TOAST",
    },
    {
      id: "db-s2-original-17",
      prompt: "How many bits are contained in the standard UUID data type?",
      options: [
        {
          id: "a",
          text: "64 bits in a compact sequence counter.",
        },
        {
          id: "b",
          text: "256 bits in a cryptographic digest value.",
        },
        {
          id: "c",
          text: "128 bits in a universally unique identifier.",
        },
        {
          id: "d",
          text: "32 bits in a standard signed SQL integer.",
        },
      ],
      correctOptionId: "c",
      explanation: "UUID stores 128 bits (16 bytes), compared with four bytes for a typical INTEGER.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-18",
      prompt: "When an MVCC-updated row receives a new value, what happens in heap storage?",
      options: [
        {
          id: "a",
          text: "The prior tuple is overwritten and immediately loses all snapshot visibility.",
        },
        {
          id: "b",
          text: "A new tuple version is created instead of blindly overwriting the previous one.",
        },
        {
          id: "c",
          text: "PostgreSQL deletes the whole table page and recreates its index.",
        },
        {
          id: "d",
          text: "The update becomes a new database in the same server cluster.",
        },
      ],
      correctOptionId: "b",
      explanation: "Multiple row versions underpin MVCC; earlier versions may remain visible to suitable transactions until reclamation.",
      topic: "Original quiz · Heap and MVCC",
    },
    {
      id: "db-s2-original-19",
      prompt: "What bulk-loading sequence is recommended in the lecture when operationally safe?",
      options: [
        {
          id: "a",
          text: "Build secondary indexes after loading the large data batch.",
        },
        {
          id: "b",
          text: "Add a new secondary index after every imported tuple.",
        },
        {
          id: "c",
          text: "Run CLUSTER for every INSERT before creating any table.",
        },
        {
          id: "d",
          text: "Disable all integrity constraints permanently for the database.",
        },
      ],
      correctOptionId: "a",
      explanation: "Loading first and creating secondary indexes afterward avoids repeated maintenance during large imports; do not casually drop essential production constraints.",
      topic: "Original quiz · Bulk loading",
    },
    {
      id: "db-s2-original-20",
      prompt: "How does a regular View differ from a stored query-result cache?",
      options: [
        {
          id: "a",
          text: "The view always keeps a separately materialized copy of every row.",
        },
        {
          id: "b",
          text: "The view stores a fixed snapshot from the moment it is created.",
        },
        {
          id: "c",
          text: "The view automatically becomes a physical clustered table.",
        },
        {
          id: "d",
          text: "The view retains a query definition and computes its result when queried.",
        },
      ],
      correctOptionId: "d",
      explanation: "Ordinary views are stored SQL definitions; materialized views hold persisted query results and can become stale.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-21",
      prompt: "Which SQL:2023 compliance count does the first lecture explicitly report?",
      options: [
        {
          id: "a",
          text: "179 of 179 mandatory core features.",
        },
        {
          id: "b",
          text: "100 of 160 mandatory core features.",
        },
        {
          id: "c",
          text: "160 of 179 mandatory core features.",
        },
        {
          id: "d",
          text: "79 of 160 mandatory core features.",
        },
      ],
      correctOptionId: "c",
      explanation: "This is a lecture-specific factual claim from the PostgreSQL introduction slide, not a substitute for checking the current standards matrix.",
      topic: "Original quiz · Course recap",
    },
    {
      id: "db-s2-original-22",
      prompt: "According to the index-maintenance slides, what can contribute to index bloat?",
      options: [
        {
          id: "a",
          text: "Choosing a B-Tree instead of Hash by itself.",
        },
        {
          id: "b",
          text: "Dead index entries persisting after row updates or deletions.",
        },
        {
          id: "c",
          text: "Enabling TOAST compression for large text values.",
        },
        {
          id: "d",
          text: "Returning fewer rows than expected from a SELECT.",
        },
      ],
      correctOptionId: "b",
      explanation: "Dead tuples and index-version churn can leave underutilized index pages; VACUUM and sometimes REINDEX address bloat.",
      topic: "Original quiz · Index maintenance",
    },
    {
      id: "db-s2-original-23",
      prompt: "Which use case best fits a Generalized Inverted Index (GIN)?",
      options: [
        {
          id: "a",
          text: "Mapping JSONB/array components to potentially many matching rows.",
        },
        {
          id: "b",
          text: "Returning rows by a conventional numeric sort key only.",
        },
        {
          id: "c",
          text: "Physically moving all heap tuples to primary-key order.",
        },
        {
          id: "d",
          text: "Locating one tuple through an individual transaction number.",
        },
      ],
      correctOptionId: "a",
      explanation: "GIN maps searchable component keys to matching posting lists and suits multivalued content.",
      topic: "Original quiz · GIN",
    },
    {
      id: "db-s2-original-24",
      prompt: "Why should AI pipelines care about data movement from disk?",
      options: [
        {
          id: "a",
          text: "Every disk read is faster than equivalent RAM access by several orders.",
        },
        {
          id: "b",
          text: "Storing vectors in columns automatically eliminates all disk I/O.",
        },
        {
          id: "c",
          text: "Page-level locality is irrelevant once a model has been trained.",
        },
        {
          id: "d",
          text: "Disk access can be orders of magnitude slower than RAM and leave compute units waiting.",
        },
      ],
      correctOptionId: "d",
      explanation: "Poor layout and oversized reads can make storage I/O the bottleneck even if the model's computation is fast.",
      topic: "Original quiz · Storage and I/O",
    },
    {
      id: "db-s2-original-25",
      prompt: "What best compares conventional PostgreSQL heap indexing with InnoDB's clustered primary index?",
      options: [
        {
          id: "a",
          text: "Both databases always store all table tuples in secondary-index leaves.",
        },
        {
          id: "b",
          text: "PostgreSQL keeps the heap automatically ordered by primary-key value.",
        },
        {
          id: "c",
          text: "PostgreSQL stores heap tuples separately and index entries point to TIDs.",
        },
        {
          id: "d",
          text: "InnoDB primary-key leaves store only TIDs into an unordered heap.",
        },
      ],
      correctOptionId: "c",
      explanation: "InnoDB's clustered primary index holds row data in leaves; PostgreSQL normally uses separate heap tuples and nonclustered indexes.",
      topic: "Original quiz · Clustered vs nonclustered",
    },
    {
      id: "db-s2-001",
      prompt: "Why can page locality matter more than the number of rows returned?",
      options: [
        {
          id: "a",
          text: "Every PostgreSQL query scans all rows regardless of its predicate.",
        },
        {
          id: "b",
          text: "Reading 10 pages can require less disk I/O than reading 100 scattered pages.",
        },
        {
          id: "c",
          text: "Disk I/O cost is determined exclusively by output row count.",
        },
        {
          id: "d",
          text: "A page contains exactly one tuple in PostgreSQL.",
        },
      ],
      correctOptionId: "b",
      explanation: "PostgreSQL transfers storage pages rather than individual disk tuples, so fewer page accesses often matter more than fewer rows.",
      topic: "Storage and I/O",
    },
    {
      id: "db-s2-002",
      prompt: "A PostgreSQL cluster hosts app_db, analytics_db, and ai_db. What is a plausible effect of a heavy analytics scan?",
      options: [
        {
          id: "a",
          text: "The scan may compete with the other databases for shared memory and disk I/O.",
        },
        {
          id: "b",
          text: "Each database has a completely isolated CPU and buffer pool.",
        },
        {
          id: "c",
          text: "A scan can access only CPU cycles reserved for its own database.",
        },
        {
          id: "d",
          text: "The scan automatically converts the entire cluster to read-only mode.",
        },
      ],
      correctOptionId: "a",
      explanation: "Databases in a cluster share server resources; resource contention can affect otherwise unrelated workloads.",
      topic: "Storage hierarchy",
    },
    {
      id: "db-s2-003",
      prompt: "Which hierarchy correctly describes a PostgreSQL installation down to its I/O blocks?",
      options: [
        {
          id: "a",
          text: "Cluster → relation → page → database.",
        },
        {
          id: "b",
          text: "Page → relation → database → cluster.",
        },
        {
          id: "c",
          text: "Database → cluster → page → relation.",
        },
        {
          id: "d",
          text: "Cluster → database → relation → page.",
        },
      ],
      correctOptionId: "d",
      explanation: "One instance/cluster hosts databases; tables and indexes are relations composed of fixed-size pages.",
      topic: "Storage hierarchy",
    },
    {
      id: "db-s2-004",
      prompt: "Under the default configuration, what happens when PostgreSQL needs a row not already cached?",
      options: [
        {
          id: "a",
          text: "It transfers only the exact bytes occupied by the row.",
        },
        {
          id: "b",
          text: "It reads all pages of the database into memory first.",
        },
        {
          id: "c",
          text: "It fetches the containing 8 KB page into shared buffers.",
        },
        {
          id: "d",
          text: "It creates a separate disk block for the selected row.",
        },
      ],
      correctOptionId: "c",
      explanation: "The page is the basic unit of PostgreSQL buffer management and I/O; the normal PostgreSQL build uses 8 KB pages.",
      topic: "Page anatomy",
    },
    {
      id: "db-s2-005",
      prompt: "Where is the free-space region in a typical PostgreSQL heap page?",
      options: [
        {
          id: "a",
          text: "Inside the page header before metadata fields.",
        },
        {
          id: "b",
          text: "Between the line-pointer array and tuples growing from the end.",
        },
        {
          id: "c",
          text: "Inside every tuple between its column values.",
        },
        {
          id: "d",
          text: "After the last tuple beyond the end of the page.",
        },
      ],
      correctOptionId: "b",
      explanation: "Item pointers grow from the front; tuple data are placed from the end; available space lies between them.",
      topic: "Page anatomy",
    },
    {
      id: "db-s2-006",
      prompt: "What does a line pointer in a heap page primarily identify?",
      options: [
        {
          id: "a",
          text: "The offset and status information for an item on that page.",
        },
        {
          id: "b",
          text: "The primary key of a row in an external index.",
        },
        {
          id: "c",
          text: "The file path containing an entire database.",
        },
        {
          id: "d",
          text: "The foreign-key relationship for a tuple.",
        },
      ],
      correctOptionId: "a",
      explanation: "The item identifier (line pointer) is normally four bytes and refers to the location/status of a page item.",
      topic: "Page anatomy",
    },
    {
      id: "db-s2-007",
      prompt: "A row has ctid = (42,5). What does this represent?",
      options: [
        {
          id: "a",
          text: "The primary-key value 42 and transaction ID 5.",
        },
        {
          id: "b",
          text: "The database OID 42 and schema ID 5.",
        },
        {
          id: "c",
          text: "The index height 42 and hash bucket 5.",
        },
        {
          id: "d",
          text: "Its physical tuple location: block 42, item offset 5.",
        },
      ],
      correctOptionId: "d",
      explanation: "A TID/ctid identifies a tuple location with a block number and a line-pointer offset; it is not a permanent logical identifier.",
      topic: "Heap and TID",
    },
    {
      id: "db-s2-008",
      prompt: "Why should application code avoid treating ctid as a stable business identifier?",
      options: [
        {
          id: "a",
          text: "The ctid is always identical across every table in a cluster.",
        },
        {
          id: "b",
          text: "PostgreSQL never assigns ctid values to ordinary heap rows.",
        },
        {
          id: "c",
          text: "Updates and table rewrites can change a tuple's physical location.",
        },
        {
          id: "d",
          text: "The ctid stores a fixed UUID rather than a disk address.",
        },
      ],
      correctOptionId: "c",
      explanation: "A new MVCC tuple version or operations such as VACUUM FULL/CLUSTER can alter physical tuple locations.",
      topic: "Heap and TID",
    },
    {
      id: "db-s2-009",
      prompt: "What is the physical layout of a normal PostgreSQL table?",
      options: [
        {
          id: "a",
          text: "A primary-key ordered B-Tree holding all row data.",
        },
        {
          id: "b",
          text: "An unordered heap whose free space can be reused for inserts.",
        },
        {
          id: "c",
          text: "An immutable append-only file with no page reuse.",
        },
        {
          id: "d",
          text: "A hash-bucket list sorted by insertion timestamp.",
        },
      ],
      correctOptionId: "b",
      explanation: "PostgreSQL heap tables do not stay ordered by primary key or insertion time; new tuples are placed according to available space.",
      topic: "Heap and MVCC",
    },
    {
      id: "db-s2-010",
      prompt: "What normally happens physically when an existing PostgreSQL row is updated?",
      options: [
        {
          id: "a",
          text: "A new tuple version is written while the previous version may remain temporarily.",
        },
        {
          id: "b",
          text: "The old tuple is always overwritten in place with no old version.",
        },
        {
          id: "c",
          text: "The entire relation is dropped and rebuilt for the update.",
        },
        {
          id: "d",
          text: "Every index is immediately converted into a hash index.",
        },
      ],
      correctOptionId: "a",
      explanation: "MVCC permits different transactions to see appropriate row versions; cleanup later removes dead versions.",
      topic: "Heap and MVCC",
    },
    {
      id: "db-s2-011",
      prompt: "Why can heavy UPDATE and DELETE activity inflate a heap table?",
      options: [
        {
          id: "a",
          text: "Updates automatically double the size of every 8 KB page.",
        },
        {
          id: "b",
          text: "All deleted tuples become permanent primary-key index entries.",
        },
        {
          id: "c",
          text: "PostgreSQL stores each row in a separate operating-system file.",
        },
        {
          id: "d",
          text: "Dead tuple versions and fragmented space may accumulate before cleanup.",
        },
      ],
      correctOptionId: "d",
      explanation: "MVCC and deleted rows leave space to be reclaimed or reused; maintenance helps control table bloat.",
      topic: "Heap and MVCC",
    },
    {
      id: "db-s2-012",
      prompt: "A tuple becomes too large for efficient in-page storage. Which mechanism addresses this?",
      options: [
        {
          id: "a",
          text: "A Hash index automatically breaks the tuple into buckets.",
        },
        {
          id: "b",
          text: "CLUSTER transforms the tuple into multiple logical rows.",
        },
        {
          id: "c",
          text: "TOAST can compress suitable values and move them out-of-line.",
        },
        {
          id: "d",
          text: "A primary key enlarges all heap pages to one megabyte.",
        },
      ],
      correctOptionId: "c",
      explanation: "TOAST manages large varlena attributes using compression and/or external TOAST storage, keeping heap tuples manageable.",
      topic: "TOAST",
    },
    {
      id: "db-s2-013",
      prompt: "The slide says TOAST typically becomes relevant around which tuple-size target?",
      options: [
        {
          id: "a",
          text: "Exactly 8 KB for every column of every table.",
        },
        {
          id: "b",
          text: "About 2 KB, subject to storage settings and tuple layout.",
        },
        {
          id: "c",
          text: "Exactly 1 MB before any compression can occur.",
        },
        {
          id: "d",
          text: "Exactly 128 bits because a UUID sets the page limit.",
        },
      ],
      correctOptionId: "b",
      explanation: "The default TOAST target is commonly around 2 KB; it is a configurable heuristic, not a hard universal trigger.",
      topic: "TOAST",
    },
    {
      id: "db-s2-014",
      prompt: "A table stores a 1 MB document in a text-like column. What is a likely storage approach?",
      options: [
        {
          id: "a",
          text: "A small heap reference points to compressed or out-of-line TOAST chunks.",
        },
        {
          id: "b",
          text: "The document is forced into a single default 8 KB heap page.",
        },
        {
          id: "c",
          text: "All other records are deleted to make room for the document.",
        },
        {
          id: "d",
          text: "The document becomes the root node of the table's B-Tree.",
        },
      ],
      correctOptionId: "a",
      explanation: "Large values can be represented in-row by a pointer to separately stored TOAST data after applicable compression.",
      topic: "TOAST",
    },
    {
      id: "db-s2-015",
      prompt: "What is the main advantage of keeping wide values outside ordinary heap tuples?",
      options: [
        {
          id: "a",
          text: "All columns can be indexed without consuming disk space.",
        },
        {
          id: "b",
          text: "Every query avoids heap access even when selecting wide data.",
        },
        {
          id: "c",
          text: "The database no longer needs MVCC versions during updates.",
        },
        {
          id: "d",
          text: "Unrelated scans may move fewer bytes because heap rows remain narrower.",
        },
      ],
      correctOptionId: "d",
      explanation: "Small heap rows allow more tuples per page; fetching the large value when needed is a separate cost.",
      topic: "TOAST",
    },
    {
      id: "db-s2-016",
      prompt: "Which trade-off is associated with creating an additional ordinary index?",
      options: [
        {
          id: "a",
          text: "Faster inserts because no index pages need to be changed.",
        },
        {
          id: "b",
          text: "Guaranteed faster execution for every query on the table.",
        },
        {
          id: "c",
          text: "Faster eligible lookups at the cost of space and write maintenance.",
        },
        {
          id: "d",
          text: "Less disk usage because the index replaces the heap file.",
        },
      ],
      correctOptionId: "c",
      explanation: "Indexes accelerate some reads but consume storage and must be maintained as data changes.",
      topic: "Index fundamentals",
    },
    {
      id: "db-s2-017",
      prompt: "Which query is a natural candidate for a B-Tree index on price?",
      options: [
        {
          id: "a",
          text: "SELECT * FROM products WHERE metadata @> '{\"tag\":\"sale\"}';",
        },
        {
          id: "b",
          text: "SELECT * FROM products WHERE price BETWEEN 100 AND 200;",
        },
        {
          id: "c",
          text: "SELECT * FROM locations WHERE coordinates && search_box;",
        },
        {
          id: "d",
          text: "SELECT * FROM documents WHERE tokens @@ text_query;",
        },
      ],
      correctOptionId: "b",
      explanation: "B-Tree supports ordered comparison predicates including equality, ranges and sorted output; JSON, spatial and text operators often use specialized indexes.",
      topic: "B-Tree",
    },
    {
      id: "db-s2-018",
      prompt: "What is the usual B-Tree search sequence for an indexed heap lookup?",
      options: [
        {
          id: "a",
          text: "Root → internal pages → leaf containing TID → heap tuple.",
        },
        {
          id: "b",
          text: "Heap page → root → buffer pool → WAL record.",
        },
        {
          id: "c",
          text: "Hash bucket → JSON token → root → tuple.",
        },
        {
          id: "d",
          text: "TOAST chunk → leaf → database directory → heap.",
        },
      ],
      correctOptionId: "a",
      explanation: "B-Tree navigation follows separator keys to a leaf and ordinarily retrieves a heap tuple through the stored TID.",
      topic: "B-Tree",
    },
    {
      id: "db-s2-019",
      prompt: "What property keeps B-Tree lookup depth predictable as the table grows?",
      options: [
        {
          id: "a",
          text: "Every key is located in the root page of the index.",
        },
        {
          id: "b",
          text: "The number of levels always equals the number of tuples.",
        },
        {
          id: "c",
          text: "All leaves must be stored in one heap page regardless of size.",
        },
        {
          id: "d",
          text: "The tree remains balanced and its leaves occur at the same level.",
        },
      ],
      correctOptionId: "d",
      explanation: "Balanced height gives logarithmic search behavior; PostgreSQL B-Trees usually have relatively small height.",
      topic: "B-Tree",
    },
    {
      id: "db-s2-020",
      prompt: "A query filters email = 'x@example.com' and then sorts by price. What is true of an index only on email?",
      options: [
        {
          id: "a",
          text: "It automatically sorts the output by every column in the table.",
        },
        {
          id: "b",
          text: "It cannot be considered because email stores text rather than integers.",
        },
        {
          id: "c",
          text: "It may help the equality lookup but does not inherently satisfy ORDER BY price.",
        },
        {
          id: "d",
          text: "It always produces an index-only scan with no heap visibility checks.",
        },
      ],
      correctOptionId: "c",
      explanation: "An email index orders its own key; sorting by a different field may still require an explicit sort.",
      topic: "B-Tree",
    },
    {
      id: "db-s2-021",
      prompt: "What does a PostgreSQL Hash index fundamentally use to organize searches?",
      options: [
        {
          id: "a",
          text: "Lexicographically ordered leaf nodes for range scans.",
        },
        {
          id: "b",
          text: "Hash values assigned to buckets for equality comparisons.",
        },
        {
          id: "c",
          text: "Geometric bounding boxes for nearest-neighbor traversal.",
        },
        {
          id: "d",
          text: "An inverted posting list for each JSON document token.",
        },
      ],
      correctOptionId: "b",
      explanation: "Hash indexes are designed for equality predicates based on hash values and do not supply ordered range traversal.",
      topic: "Hash index",
    },
    {
      id: "db-s2-022",
      prompt: "Which operation is not directly supported by a Hash index's access method?",
      options: [
        {
          id: "a",
          text: "Producing rows ordered by the indexed key for ORDER BY.",
        },
        {
          id: "b",
          text: "Looking up a row whose indexed key equals a constant.",
        },
        {
          id: "c",
          text: "Finding matching hash buckets for an equality predicate.",
        },
        {
          id: "d",
          text: "Using a hash function as part of the index lookup.",
        },
      ],
      correctOptionId: "a",
      explanation: "Hash index order follows hash codes, not the key's sort order; B-Tree is appropriate for ordered scans.",
      topic: "Hash index",
    },
    {
      id: "db-s2-023",
      prompt: "A map application searches for points within a polygon. Which index family is a natural choice?",
      options: [
        {
          id: "a",
          text: "A Hash index on the text representation of each point.",
        },
        {
          id: "b",
          text: "A standard B-Tree on the row's insertion timestamp.",
        },
        {
          id: "c",
          text: "An INCLUDE-only index without a search key.",
        },
        {
          id: "d",
          text: "GiST with an appropriate spatial operator class.",
        },
      ],
      correctOptionId: "d",
      explanation: "GiST can support spatial operator classes such as those used with PostGIS, including bounding-box and geometric searches.",
      topic: "GiST",
    },
    {
      id: "db-s2-024",
      prompt: "Why may a GiST scan need to recheck candidate geometries?",
      options: [
        {
          id: "a",
          text: "GiST always stores full heap tuples in every internal node.",
        },
        {
          id: "b",
          text: "GiST cannot handle any spatial predicate exactly.",
        },
        {
          id: "c",
          text: "Some indexed representations are lossy and may return candidates requiring verification.",
        },
        {
          id: "d",
          text: "All GiST indexes use UUID hashes for query ordering.",
        },
      ],
      correctOptionId: "c",
      explanation: "Lossy summaries can admit false-positive candidates; the original predicate must then be checked against the heap data.",
      topic: "GiST",
    },
    {
      id: "db-s2-025",
      prompt: "Which workload most naturally benefits from a GIN index?",
      options: [
        {
          id: "a",
          text: "Returning every row in the exact order of a numeric price key.",
        },
        {
          id: "b",
          text: "Testing whether a JSONB document contains a specified key/value structure.",
        },
        {
          id: "c",
          text: "Finding an integer's predecessor in a B-Tree leaf.",
        },
        {
          id: "d",
          text: "Physically reordering all heap tuples by primary key.",
        },
      ],
      correctOptionId: "b",
      explanation: "GIN is an inverted index suited to composite values such as JSONB, arrays and text-search lexemes.",
      topic: "GIN",
    },
    {
      id: "db-s2-026",
      prompt: "Which SQL creates a GIN index over a JSONB metadata column?",
      options: [
        {
          id: "a",
          text: "CREATE INDEX idx_meta ON events USING GIN (metadata);",
        },
        {
          id: "b",
          text: "CREATE INDEX idx_meta ON events USING HASH (metadata);",
        },
        {
          id: "c",
          text: "CLUSTER events USING GIN (metadata);",
        },
        {
          id: "d",
          text: "CREATE INDEX idx_meta ON events INCLUDE (metadata);",
        },
      ],
      correctOptionId: "a",
      explanation: "GIN is specified with USING GIN; the index supports JSONB operators depending on the chosen operator class.",
      topic: "GIN",
    },
    {
      id: "db-s2-027",
      prompt: "For a GIN-indexed JSONB column, which filter matches the containment use case from the slide?",
      options: [
        {
          id: "a",
          text: "WHERE metadata BETWEEN 'a' AND 'z'",
        },
        {
          id: "b",
          text: "WHERE metadata LIKE 'active%'",
        },
        {
          id: "c",
          text: "WHERE metadata IS DISTINCT FROM 12",
        },
        {
          id: "d",
          text: "WHERE metadata @> '{\"status\":\"active\"}'",
        },
      ],
      correctOptionId: "d",
      explanation: "The JSONB @> operator asks whether the left document contains the specified right-hand structure.",
      topic: "GIN",
    },
    {
      id: "db-s2-028",
      prompt: "In the slide's comparison, how does InnoDB's primary clustered index differ from PostgreSQL's ordinary heap plus index?",
      options: [
        {
          id: "a",
          text: "Both engines store all physical rows inside every secondary-index leaf.",
        },
        {
          id: "b",
          text: "PostgreSQL primary-key indexes enforce an automatically sorted heap layout.",
        },
        {
          id: "c",
          text: "InnoDB primary-index leaves contain rows; PostgreSQL index entries usually point into a heap.",
        },
        {
          id: "d",
          text: "InnoDB uses no leaf pages and stores only tuple IDs in memory.",
        },
      ],
      correctOptionId: "c",
      explanation: "For conventional InnoDB tables, clustered primary-key leaf entries hold rows; PostgreSQL heap tuples are separate from ordinary index entries.",
      topic: "Clustered vs nonclustered",
    },
    {
      id: "db-s2-029",
      prompt: "A PostgreSQL table already has three indexes. What is generally permitted?",
      options: [
        {
          id: "a",
          text: "The database prohibits any table from having a second index.",
        },
        {
          id: "b",
          text: "More indexes may be added, but each has storage and write costs.",
        },
        {
          id: "c",
          text: "A new index requires converting the heap into InnoDB layout.",
        },
        {
          id: "d",
          text: "The third index replaces the previous primary-key definition.",
        },
      ],
      correctOptionId: "b",
      explanation: "Nonclustered indexing permits multiple indexes per heap relation; excessive indexing still has overhead.",
      topic: "Clustered vs nonclustered",
    },
    {
      id: "db-s2-030",
      prompt: "What does CLUSTER film USING idx_film_title do?",
      options: [
        {
          id: "a",
          text: "Physically rewrites the heap in the order of the selected index at that time.",
        },
        {
          id: "b",
          text: "Enables automatic heap reordering after every new INSERT.",
        },
        {
          id: "c",
          text: "Converts idx_film_title into a permanent unique constraint.",
        },
        {
          id: "d",
          text: "Changes the table into a permanently index-organized B-Tree.",
        },
      ],
      correctOptionId: "a",
      explanation: "PostgreSQL CLUSTER is a one-time heap reorganization, not an always-maintained clustered-index structure.",
      topic: "CLUSTER",
    },
    {
      id: "db-s2-031",
      prompt: "What is expected after many new inserts into a previously CLUSTERed table?",
      options: [
        {
          id: "a",
          text: "Future inserts are guaranteed to preserve the existing sorted order.",
        },
        {
          id: "b",
          text: "The heap automatically rejects any row not in the original range.",
        },
        {
          id: "c",
          text: "The selected index no longer works for lookups until CLUSTER runs again.",
        },
        {
          id: "d",
          text: "Physical ordering can deteriorate and clustering may need to be repeated.",
        },
      ],
      correctOptionId: "d",
      explanation: "New and updated tuples are not continuously maintained in the CLUSTER order.",
      topic: "CLUSTER",
    },
    {
      id: "db-s2-032",
      prompt: "What is the operational downside of adding many indexes to a write-heavy table?",
      options: [
        {
          id: "a",
          text: "PostgreSQL can no longer perform any SELECT against the heap.",
        },
        {
          id: "b",
          text: "The database silently changes every primary key to UUID.",
        },
        {
          id: "c",
          text: "INSERT and UPDATE work can increase because affected indexes require maintenance.",
        },
        {
          id: "d",
          text: "Rows become impossible to delete without rebuilding the whole server.",
        },
      ],
      correctOptionId: "c",
      explanation: "Each index is an additional persistent structure; maintenance raises write amplification and can increase bloat.",
      topic: "Index maintenance",
    },
    {
      id: "db-s2-033",
      prompt: "Which maintenance command routinely helps reclaim reusable space associated with dead tuples?",
      options: [
        {
          id: "a",
          text: "DROP DATABASE keeps all indexes while deleting dead row versions.",
        },
        {
          id: "b",
          text: "VACUUM helps clean dead tuples and reusable heap/index space.",
        },
        {
          id: "c",
          text: "SELECT COUNT(*) physically compacts every index in the relation.",
        },
        {
          id: "d",
          text: "SET enable_seqscan = off reclaims deleted tuples from heap pages.",
        },
      ],
      correctOptionId: "b",
      explanation: "Regular VACUUM marks storage reusable and maintains visibility metadata; it normally does not shrink the table file back to the OS.",
      topic: "Index maintenance",
    },
    {
      id: "db-s2-034",
      prompt: "A B-Tree remains severely bloated after repeated churn. Which operation rebuilds its physical structure?",
      options: [
        {
          id: "a",
          text: "REINDEX rebuilds the index from table contents.",
        },
        {
          id: "b",
          text: "ANALYZE always rewrites the entire index from scratch.",
        },
        {
          id: "c",
          text: "CHECKPOINT merges all live and dead index records into heap.",
        },
        {
          id: "d",
          text: "ORDER BY permanently compacts every leaf page of the index.",
        },
      ],
      correctOptionId: "a",
      explanation: "REINDEX reconstructs an index and can remove accumulated index bloat; VACUUM handles routine cleanup.",
      topic: "Index maintenance",
    },
    {
      id: "db-s2-035",
      prompt: "What is a sound bulk-load strategy when indexes are not needed during ingestion?",
      options: [
        {
          id: "a",
          text: "Create duplicate secondary indexes for every column before importing.",
        },
        {
          id: "b",
          text: "Force each incoming row to run a separate CLUSTER command.",
        },
        {
          id: "c",
          text: "Use a Hash index to replace the entire table and skip loading.",
        },
        {
          id: "d",
          text: "Load the large batch before building secondary indexes, then analyze statistics.",
        },
      ],
      correctOptionId: "d",
      explanation: "Bulk building secondary indexes can be cheaper than maintaining them for millions of individual inserts; constraints and production needs may limit dropping existing indexes.",
      topic: "Bulk loading",
    },
    {
      id: "db-s2-036",
      prompt: "A table has 10 million rows but only 10,000 pending orders. What is the partial-index advantage?",
      options: [
        {
          id: "a",
          text: "It automatically stores every row in sorted physical heap order.",
        },
        {
          id: "b",
          text: "It eliminates the need to evaluate the pending predicate anywhere.",
        },
        {
          id: "c",
          text: "It stores entries only for qualifying pending rows, reducing size and maintenance.",
        },
        {
          id: "d",
          text: "It changes all pending rows into separate PostgreSQL databases.",
        },
      ],
      correctOptionId: "c",
      explanation: "Partial indexes cover a defined subset; the slide's illustrative comparison is 10,000 vs 10 million entries.",
      topic: "Partial index",
    },
    {
      id: "db-s2-037",
      prompt: "Which definition correctly indexes only active unreturned rentals?",
      options: [
        {
          id: "a",
          text: "CREATE INDEX idx_active ON rental (inventory_id) ORDER BY return_date IS NULL;",
        },
        {
          id: "b",
          text: "CREATE INDEX idx_active ON rental (inventory_id) WHERE return_date IS NULL;",
        },
        {
          id: "c",
          text: "CREATE INDEX idx_active ON rental WHERE return_date IS NULL USING HASH (inventory_id);",
        },
        {
          id: "d",
          text: "CREATE INDEX idx_active ON rental (inventory_id) INCLUDE WHERE return_date IS NULL;",
        },
      ],
      correctOptionId: "b",
      explanation: "A partial B-Tree is declared by a normal CREATE INDEX with a predicate after the key-column list.",
      topic: "Partial index",
    },
    {
      id: "db-s2-038",
      prompt: "An index is partial with WHERE status = 'pending'. Which query most clearly qualifies for its use?",
      options: [
        {
          id: "a",
          text: "SELECT * FROM orders WHERE status = 'pending' AND customer_id = 7;",
        },
        {
          id: "b",
          text: "SELECT * FROM orders WHERE status = 'shipped' AND customer_id = 7;",
        },
        {
          id: "c",
          text: "SELECT * FROM orders WHERE customer_id = 7;",
        },
        {
          id: "d",
          text: "SELECT * FROM orders WHERE status IS NOT NULL;",
        },
      ],
      correctOptionId: "a",
      explanation: "The query predicate must imply the index predicate; pending is explicit here, whereas the other filters cannot guarantee membership.",
      topic: "Partial index",
    },
    {
      id: "db-s2-039",
      prompt: "Why might a parameterized query WHERE status = $1 not use a status='pending' partial index in a generic plan?",
      options: [
        {
          id: "a",
          text: "PostgreSQL bans bound parameters in all WHERE expressions.",
        },
        {
          id: "b",
          text: "Partial indexes may never be used for equality conditions.",
        },
        {
          id: "c",
          text: "Every prepared statement executes a full table rewrite first.",
        },
        {
          id: "d",
          text: "The planner cannot assume an arbitrary parameter value implies the predicate.",
        },
      ],
      correctOptionId: "d",
      explanation: "A generic plan must work for different parameter values; without known implication it cannot rely on an index covering only pending rows.",
      topic: "Partial index",
    },
    {
      id: "db-s2-040",
      prompt: "Given 10,000 indexed rows from 10 million total, what fraction is indexed?",
      options: [
        {
          id: "a",
          text: "1% of all rows.",
        },
        {
          id: "b",
          text: "0.01% of all rows.",
        },
        {
          id: "c",
          text: "0.1% of all rows.",
        },
        {
          id: "d",
          text: "10% of all rows.",
        },
      ],
      correctOptionId: "c",
      explanation: "10,000 / 10,000,000 = 0.001 = 0.1%; this approximates the fraction of rows contributing partial-index entries.",
      topic: "Partial index practice",
    },
    {
      id: "db-s2-041",
      prompt: "An index grows by 81,920 bytes. Under an 8 KB page-size assumption, how many pages is that?",
      options: [
        {
          id: "a",
          text: "8 pages at 10,240 bytes per page.",
        },
        {
          id: "b",
          text: "10 pages at 8,192 bytes per page.",
        },
        {
          id: "c",
          text: "16 pages at 5,120 bytes per page.",
        },
        {
          id: "d",
          text: "20 pages at 4,096 bytes per page.",
        },
      ],
      correctOptionId: "b",
      explanation: "Divide 81,920 by 8,192 to obtain 10 logical 8 KB pages; allocated size may include index overhead.",
      topic: "Storage practice",
    },
    {
      id: "db-s2-042",
      prompt: "For 1,000 matching rows stored within 10 heap pages versus 100 matching rows on 100 different pages, which statement is best?",
      options: [
        {
          id: "a",
          text: "The first can require fewer heap page reads despite returning more rows.",
        },
        {
          id: "b",
          text: "The second must always be faster because it returns fewer rows.",
        },
        {
          id: "c",
          text: "Both cases always require exactly 100 disk block reads.",
        },
        {
          id: "d",
          text: "Page locality has no impact once an index has been created.",
        },
      ],
      correctOptionId: "a",
      explanation: "With identical assumptions and no cache effects, accessing 10 pages may cost less I/O than accessing 100 scattered pages.",
      topic: "Storage practice",
    },
    {
      id: "db-s2-043",
      prompt: "An index is defined on (last_name, first_name). Which lookup naturally follows the leading-key rule?",
      options: [
        {
          id: "a",
          text: "WHERE first_name = 'An' with no other condition",
        },
        {
          id: "b",
          text: "WHERE salary > 1000 with no name condition",
        },
        {
          id: "c",
          text: "WHERE lower(first_name) = 'an' alone",
        },
        {
          id: "d",
          text: "WHERE last_name = 'Nguyen' AND first_name = 'An'",
        },
      ],
      correctOptionId: "d",
      explanation: "The B-Tree is ordered first by last_name and then first_name; combining both leading keys yields a useful search interval.",
      topic: "Multicolumn index",
    },
    {
      id: "db-s2-044",
      prompt: "Which query can generally exploit the leftmost prefix of (last_name, first_name)?",
      options: [
        {
          id: "a",
          text: "WHERE first_name = 'Binh'",
        },
        {
          id: "b",
          text: "WHERE city = 'Hanoi'",
        },
        {
          id: "c",
          text: "WHERE last_name = 'Tran'",
        },
        {
          id: "d",
          text: "WHERE length(first_name) > 2",
        },
      ],
      correctOptionId: "c",
      explanation: "Filtering the first index key yields a contiguous index range. PostgreSQL may still consider scans on nonleading keys in some circumstances, so 'never usable' is too absolute.",
      topic: "Multicolumn index",
    },
    {
      id: "db-s2-045",
      prompt: "What is a limitation of the slide's recommendation to put the highest-cardinality column first?",
      options: [
        {
          id: "a",
          text: "A multicolumn B-Tree can contain only columns with identical data types.",
        },
        {
          id: "b",
          text: "Actual predicate patterns and ordering requirements also determine the best column order.",
        },
        {
          id: "c",
          text: "B-Tree keys are always automatically sorted by the second column first.",
        },
        {
          id: "d",
          text: "Cardinality completely determines index usage regardless of SQL predicates.",
        },
      ],
      correctOptionId: "b",
      explanation: "The leading-column access pattern is central; choose key order from equality/range predicates and common queries, not cardinality alone.",
      topic: "Multicolumn index",
    },
    {
      id: "db-s2-046",
      prompt: "Which SQL creates a covering index with an included, non-key column?",
      options: [
        {
          id: "a",
          text: "CREATE INDEX idx_order ON orders (customer_id) INCLUDE (total);",
        },
        {
          id: "b",
          text: "CREATE INDEX idx_order ON orders INCLUDE (customer_id) KEY (total);",
        },
        {
          id: "c",
          text: "CREATE INDEX idx_order ON orders (customer_id) WHERE INCLUDE (total);",
        },
        {
          id: "d",
          text: "CREATE INDEX idx_order ON orders USING GIN INCLUDE customer_id,total;",
        },
      ],
      correctOptionId: "a",
      explanation: "INCLUDE stores additional attributes in index leaf tuples while keeping them outside the search key ordering.",
      topic: "Covering index",
    },
    {
      id: "db-s2-047",
      prompt: "Why can an INCLUDE index help an Index Only Scan?",
      options: [
        {
          id: "a",
          text: "It forces the entire PostgreSQL heap to follow the included column order.",
        },
        {
          id: "b",
          text: "It disables all MVCC visibility checks for the relation.",
        },
        {
          id: "c",
          text: "It guarantees faster queries even if all table pages fit in RAM.",
        },
        {
          id: "d",
          text: "A query may obtain selected columns from the index without fetching heap column values.",
        },
      ],
      correctOptionId: "d",
      explanation: "Index-only scans can return covered columns from the index, although visibility-map checks and heap visits may still be necessary.",
      topic: "Covering index",
    },
    {
      id: "db-s2-048",
      prompt: "An index contains (customer_id) INCLUDE (total). Which statement is correct?",
      options: [
        {
          id: "a",
          text: "total automatically becomes the first search key for all predicates.",
        },
        {
          id: "b",
          text: "Both fields always become unique even without a UNIQUE clause.",
        },
        {
          id: "c",
          text: "customer_id is a search key; total is payload available at index leaves.",
        },
        {
          id: "d",
          text: "The table is permanently clustered by total and then customer_id.",
        },
      ],
      correctOptionId: "c",
      explanation: "INCLUDE attributes do not participate as ordinary ordered search keys; they help cover returned columns.",
      topic: "Covering index",
    },
    {
      id: "db-s2-049",
      prompt: "What is the basic distinction between pg_table_size and pg_indexes_size?",
      options: [
        {
          id: "a",
          text: "Both report only the number of currently visible SQL rows.",
        },
        {
          id: "b",
          text: "The first measures table-associated storage; the second measures its indexes.",
        },
        {
          id: "c",
          text: "The first returns CPU cost while the second returns disk latency.",
        },
        {
          id: "d",
          text: "Both always produce the same size for each indexed relation.",
        },
      ],
      correctOptionId: "b",
      explanation: "These diagnostic functions distinguish table storage from index storage; pg_total_relation_size includes the associated total footprint.",
      topic: "Size diagnostics",
    },
    {
      id: "db-s2-050",
      prompt: "Which PostgreSQL expression directly reports total index bytes for the payment relation?",
      options: [
        {
          id: "a",
          text: "SELECT pg_indexes_size('payment');",
        },
        {
          id: "b",
          text: "SELECT pg_table_size('payment');",
        },
        {
          id: "c",
          text: "SELECT pg_relation_size('payment_date');",
        },
        {
          id: "d",
          text: "SELECT pg_size_pretty('payment');",
        },
      ],
      correctOptionId: "a",
      explanation: "pg_indexes_size(regclass) returns the aggregate size of indexes on a table; pg_size_pretty can format the resulting byte count.",
      topic: "Size diagnostics",
    },
    {
      id: "db-s2-051",
      prompt: "If pg_indexes_size('payment') rises after CREATE INDEX, what is the strongest conclusion?",
      options: [
        {
          id: "a",
          text: "PostgreSQL must now execute all SELECT queries with that index.",
        },
        {
          id: "b",
          text: "The payment heap necessarily shrank by exactly the same amount.",
        },
        {
          id: "c",
          text: "The number of payment rows automatically doubled at index creation.",
        },
        {
          id: "d",
          text: "An additional index consumed persistent disk space; the difference quantifies growth.",
        },
      ],
      correctOptionId: "d",
      explanation: "Creating an index allocates index pages; before/after sizes indicate storage overhead, not a guaranteed planner decision.",
      topic: "Size diagnostics",
    },
    {
      id: "db-s2-052",
      prompt: "The marketing team repeatedly filters replacement_cost > 25. Which partial index matches the stated workload?",
      options: [
        {
          id: "a",
          text: "CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost < 25;",
        },
        {
          id: "b",
          text: "CREATE INDEX idx_expensive ON film (title) WHERE title IS NULL;",
        },
        {
          id: "c",
          text: "CREATE INDEX idx_expensive ON film (replacement_cost) WHERE replacement_cost > 25;",
        },
        {
          id: "d",
          text: "CREATE INDEX idx_expensive ON film USING HASH (replacement_cost);",
        },
      ],
      correctOptionId: "c",
      explanation: "An index restricted to cost > 25 covers the target expensive-film subset and supports that predicate when the optimizer chooses it.",
      topic: "Partial index practice",
    },
    {
      id: "db-s2-053",
      prompt: "A query requests all rows from a tiny table despite a suitable index. What may the planner reasonably choose?",
      options: [
        {
          id: "a",
          text: "An index scan is mandatory whenever any index exists.",
        },
        {
          id: "b",
          text: "A sequential scan because visiting a few heap pages may be cheaper.",
        },
        {
          id: "c",
          text: "An index-only scan even if the selected columns are not indexed.",
        },
        {
          id: "d",
          text: "A CLUSTER rewrite before evaluating the SELECT statement.",
        },
      ],
      correctOptionId: "b",
      explanation: "Cost-based planning may prefer a sequential scan for small tables or low-selectivity queries; index presence is not a promise of index use.",
      topic: "Index selection",
    },
    {
      id: "db-s2-054",
      prompt: "What does selectivity mean when evaluating an index predicate?",
      options: [
        {
          id: "a",
          text: "How small a fraction of rows satisfy the filter.",
        },
        {
          id: "b",
          text: "How many columns were included in the SELECT list.",
        },
        {
          id: "c",
          text: "Whether the database cluster uses the default TCP port.",
        },
        {
          id: "d",
          text: "The number of indexes that contain a UUID value.",
        },
      ],
      correctOptionId: "a",
      explanation: "A selective predicate returns relatively few rows; indexed access tends to help when it saves substantial heap page visits.",
      topic: "Index selection",
    },
    {
      id: "db-s2-055",
      prompt: "Which index is best matched to a login email that must be unique?",
      options: [
        {
          id: "a",
          text: "A GiST index over geographical coordinates.",
        },
        {
          id: "b",
          text: "A GIN index over JSON metadata tokens.",
        },
        {
          id: "c",
          text: "A nonunique Hash index on an unrelated status.",
        },
        {
          id: "d",
          text: "A UNIQUE B-Tree index on the email column.",
        },
      ],
      correctOptionId: "d",
      explanation: "B-Tree unique enforcement both prevents duplicate indexed key values and supports equality email lookups.",
      topic: "Index selection",
    },
    {
      id: "db-s2-056",
      prompt: "For a table of 10 million rows queried mainly by status='active' representing only 5%, what is a sensible design?",
      options: [
        {
          id: "a",
          text: "A separate full B-Tree index for every text column.",
        },
        {
          id: "b",
          text: "Permanent CLUSTER on status after every query.",
        },
        {
          id: "c",
          text: "A partial index restricted to active rows if the workload matches.",
        },
        {
          id: "d",
          text: "No index regardless of observed latency and query plans.",
        },
      ],
      correctOptionId: "c",
      explanation: "A partial index can focus on a repeatedly accessed subset, reducing storage versus indexing every row.",
      topic: "Index selection",
    },
    {
      id: "db-s2-057",
      prompt: "A workload repeatedly tests ARRAY membership and JSONB containment. Which indexing family is most appropriate?",
      options: [
        {
          id: "a",
          text: "Hash, because buckets retain array element ordering.",
        },
        {
          id: "b",
          text: "GIN, using suitable operator classes for the indexed data.",
        },
        {
          id: "c",
          text: "B-Tree on the number of items in each array only.",
        },
        {
          id: "d",
          text: "CLUSTER, because it automatically tokenizes JSONB documents.",
        },
      ],
      correctOptionId: "b",
      explanation: "GIN maps component values to posting lists of matching rows and supports appropriate array/JSONB searches.",
      topic: "Index selection",
    },
    {
      id: "db-s2-058",
      prompt: "When doing an Index Only Scan, what can still force a heap visit?",
      options: [
        {
          id: "a",
          text: "A page without all-visible status may require an MVCC visibility check.",
        },
        {
          id: "b",
          text: "The B-Tree must always load the entire heap relation into memory.",
        },
        {
          id: "c",
          text: "PostgreSQL refuses to read INCLUDE columns from index leaves.",
        },
        {
          id: "d",
          text: "The executor must update each row to create a fresh tuple version.",
        },
      ],
      correctOptionId: "a",
      explanation: "Index coverage is necessary but not sufficient; the visibility map tells whether heap checks can be skipped safely.",
      topic: "Covering index",
    },
    {
      id: "db-s2-059",
      prompt: "Why do many overlapping indexes often harm overall database efficiency?",
      options: [
        {
          id: "a",
          text: "They eliminate the cost of writes by replicating every tuple.",
        },
        {
          id: "b",
          text: "They permanently guarantee optimal planner statistics without ANALYZE.",
        },
        {
          id: "c",
          text: "They remove the need for buffer-cache page management.",
        },
        {
          id: "d",
          text: "They consume space and create additional maintenance work on writes.",
        },
      ],
      correctOptionId: "d",
      explanation: "Every additional index consumes blocks and must stay synchronized with qualifying table changes.",
      topic: "Index maintenance",
    },
    {
      id: "db-s2-060",
      prompt: "In a benchmark, an index occupies 220 MB while a partial index for the same target subset occupies 0.5 MB. What is the approximate size ratio?",
      options: [
        {
          id: "a",
          text: "The full index is about 44 times the partial index.",
        },
        {
          id: "b",
          text: "The full index is about 2,200 times the partial index.",
        },
        {
          id: "c",
          text: "The full index is about 440 times the partial index.",
        },
        {
          id: "d",
          text: "The full index is about 22 times the partial index.",
        },
      ],
      correctOptionId: "c",
      explanation: "Using the slide's approximate figures, 220 / 0.5 = 440; real sizes depend on data and page overhead.",
      topic: "Partial index practice",
    },
    {
      id: "db-s2-061",
      prompt: "If a hypothetical index contains 3 levels rather than scanning all 1 million rows, what is the appropriate conclusion?",
      options: [
        {
          id: "a",
          text: "The entire query always completes with precisely three disk reads.",
        },
        {
          id: "b",
          text: "A lookup follows a small number of tree levels, but heap I/O may still be needed.",
        },
        {
          id: "c",
          text: "The index stores exactly one million bytes in three pages.",
        },
        {
          id: "d",
          text: "The database always examines only three logical table rows.",
        },
      ],
      correctOptionId: "b",
      explanation: "Tree height limits navigation steps; total I/O also depends on cached pages, qualifying entries and heap fetches.",
      topic: "B-Tree practice",
    },
    {
      id: "db-s2-062",
      prompt: "Why is it reasonable to avoid an index on a very low-selectivity condition?",
      options: [
        {
          id: "a",
          text: "Many matching tuples may require heap visits, making a sequential scan competitive.",
        },
        {
          id: "b",
          text: "Low selectivity means exactly one matching row, so indexing cannot work.",
        },
        {
          id: "c",
          text: "PostgreSQL forbids indexing columns containing repeated values.",
        },
        {
          id: "d",
          text: "An index immediately changes repeated values to unique identifiers.",
        },
      ],
      correctOptionId: "a",
      explanation: "An index can still exist, but if most rows match, random heap access may cost more than scanning the table.",
      topic: "Index selection",
    },
    {
      id: "db-s2-063",
      prompt: "What SQL syntax creates a conventional B-Tree index on replacement_cost?",
      options: [
        {
          id: "a",
          text: "CREATE INDEX idx_cost IN film VALUES (replacement_cost);",
        },
        {
          id: "b",
          text: "ADD INDEX idx_cost FROM film BY replacement_cost;",
        },
        {
          id: "c",
          text: "CLUSTER INDEX idx_cost ON film WHERE replacement_cost;",
        },
        {
          id: "d",
          text: "CREATE INDEX idx_cost ON film (replacement_cost);",
        },
      ],
      correctOptionId: "d",
      explanation: "In PostgreSQL the default CREATE INDEX access method is B-Tree unless another method is specified.",
      topic: "B-Tree practice",
    },
  ],
};
