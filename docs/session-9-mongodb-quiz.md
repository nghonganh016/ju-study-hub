# Session 9: NoSQL I: Document Stores with MongoDB

Source: **DB9_MongoDB.pdf** (43 physical PDF pages).

**Questions: 62**. Each question has exactly one correct option. Answer explanations and page citations are included for Study Hub.

## Topic coverage

- Why NoSQL?: 10 questions
- The document model: 12 questions
- Schema design: embed or reference: 13 questions
- MongoDB querying and aggregation: 17 questions
- Hands-on lab and applied MQL: 10 questions

## Why NoSQL?

### Q01. Which combination best explains why the lecture introduces document stores?

A. Relational engines cannot store JSON and do not support indexes.
B. Frequent schema changes, object–relational mismatch, difficult distributed JOINs, and varied data.
C. All relational transactions must be serialized, preventing any concurrent work.
D. SQL cannot represent relationships between actors and films.

**Answer: B**
**Explanation:** The slide identifies rigid schemas, reconstructing application objects via JOINs, scaling multi-table operations, and semi-structured inputs as pain points.
**Source:** DB9_MongoDB.pdf, PDF page(s) 6.

### Q02. Why does the lecture connect the document model to sharding?

A. Document models guarantee cross-shard foreign keys.
B. Sharding makes multi-table JOINs free but forces schema changes.
C. Embedding frequently accessed related data can reduce expensive cross-shard JOINs.
D. Documents automatically place every related entity on the same shard.

**Answer: C**
**Explanation:** The recap motivates document storage by asking whether data can be organized to avoid frequent JOINs when distributed.
**Source:** DB9_MongoDB.pdf, PDF page(s) 4.

### Q03. Which pairing correctly identifies a NoSQL family and its typical data unit?

A. Graph — nodes and relationships.
B. Wide-column — binary embedding vectors.
C. Key–value — JSON-like documents only.
D. Document — one fixed relational row.

**Answer: A**
**Explanation:** The family table maps graph databases to nodes/relationships, key–value to keys and values, and document stores to JSON-like documents.
**Source:** DB9_MongoDB.pdf, PDF page(s) 7.

### Q04. A service uses PostgreSQL for orders, Redis for cache entries, and MongoDB for variable product metadata. What lecture concept best describes this?

A. Schema-on-write
B. Single-model persistence
C. Horizontal partitioning
D. Polyglot persistence

**Answer: D**
**Explanation:** Polyglot persistence uses different databases for the access patterns each serves best.
**Source:** DB9_MongoDB.pdf, PDF page(s) 7.

### Q05. Which statement about MongoDB transactions matches the slide?

A. Every write to multiple documents is automatically atomic without a transaction.
B. Writes to one document are atomic, and multi-document ACID transactions are supported but costlier.
C. MongoDB cannot use ACID transactions in any version.
D. MongoDB supports atomicity only if every document has an ObjectId key.

**Answer: B**
**Explanation:** The ACID vs. BASE slide notes single-document atomicity and multi-document ACID transaction support from version 4.0, with extra cost.
**Source:** DB9_MongoDB.pdf, PDF page(s) 8.

### Q06. In the lecture, what does BASE emphasize?

A. Blocking writes until every replica has identical values.
B. Binary storage, automatic sharding, extensibility.
C. Basically Available, Soft state, Eventually consistent.
D. Backups, Atomicity, Serialization, Encryption.

**Answer: C**
**Explanation:** BASE expands to Basically Available, Soft state, Eventually consistent; replicas may converge over time.
**Source:** DB9_MongoDB.pdf, PDF page(s) 8.

### Q07. An ML experiment records variable hyperparameter sets, metrics, and raw API JSON. Which relational-model pain point is most relevant?

A. Semi-structured records have variable shapes that fit awkwardly into fixed tables.
B. Every ML experiment requires a graph traversal across sharded replicas.
C. PostgreSQL forbids text and numeric fields in the same table.
D. The only way to store JSON is to serialize it to disk outside any database.

**Answer: A**
**Explanation:** The slide explicitly names model configurations, experiment metadata, LLM histories, and raw JSON as semi-structured data.
**Source:** DB9_MongoDB.pdf, PDF page(s) 6.

### Q08. Which statement best captures the meaning of “Not Only SQL” in this lecture?

A. It requires replacing relational storage completely.
B. It refers exclusively to MongoDB and Redis.
C. It means every NoSQL system has the same query model.
D. It describes multiple non-relational families optimized for different access patterns.

**Answer: D**
**Explanation:** The slide defines several distinct NoSQL families and stresses that NoSQL does not replace SQL.
**Source:** DB9_MongoDB.pdf, PDF page(s) 7.

### Q09. A developer claims, “NoSQL databases have no transactions.” Which response is supported by the slide?

A. Correct; transactions are possible only with traditional tables.
B. Incorrect; MongoDB can provide atomic single-document writes and multi-document transactions.
C. Correct except when the database uses BSON instead of JSON.
D. Incorrect only because BASE and ACID are identical guarantees.

**Answer: B**
**Explanation:** The slide labels this claim outdated, distinguishing single-document atomicity and slower multi-document transactions.
**Source:** DB9_MongoDB.pdf, PDF page(s) 8.

### Q10. Which option correctly names the family used for embedding vectors in the lecture table?

A. Wide-column (Cassandra)
B. Graph (Neo4j)
C. Vector (Pinecone, Milvus, pgvector)
D. Key–value (Redis)

**Answer: C**
**Explanation:** The NoSQL family table lists a vector family whose data unit is embedding vectors.
**Source:** DB9_MongoDB.pdf, PDF page(s) 7.


## The document model

### Q11. Which MongoDB concept corresponds most closely to a PostgreSQL table?

A. Collection
B. Field
C. Document
D. ObjectId

**Answer: A**
**Explanation:** The vocabulary table maps PostgreSQL table to MongoDB collection.
**Source:** DB9_MongoDB.pdf, PDF page(s) 10.

### Q12. Which mapping best describes the PostgreSQL row and primary-key counterparts in MongoDB?

A. Row → collection; primary key → $group.
B. Row → field; primary key → schema validator.
C. Row → index; primary key → $lookup.
D. Row → document; primary key → _id.

**Answer: D**
**Explanation:** The SQL-to-MongoDB vocabulary comparison maps row to document and primary key to unique _id.
**Source:** DB9_MongoDB.pdf, PDF page(s) 10.

### Q13. Which field in the example film document is an array of sub-documents rather than an array of scalars?

A. rating
B. actors
C. special_features
D. rental_rate

**Answer: B**
**Explanation:** actors contains objects with actor_id and name, whereas special_features contains strings.
**Source:** DB9_MongoDB.pdf, PDF page(s) 11.

### Q14. Why does MongoDB use BSON instead of plain JSON for stored documents, according to the slide?

A. It removes the need for any document identifier.
B. It limits fields to strings and booleans.
C. It uses a binary representation with extra types such as Date, ObjectId, and Decimal128.
D. It enforces foreign keys between embedded sub-documents.

**Answer: C**
**Explanation:** BSON is described as Binary JSON with additional supported types including Date, ObjectId, Decimal128, and int32/int64.
**Source:** DB9_MongoDB.pdf, PDF page(s) 11.

### Q15. Which proposed document violates the size limit specified in the lecture?

A. A single BSON document of 18 MB.
B. A collection containing 18 MB across thousands of documents.
C. A BSON document of 4 MB with an embedded array.
D. An individual BSON document of 12 MB.

**Answer: A**
**Explanation:** The slide states a maximum BSON document size of 16 MB; this is a per-document limit.
**Source:** DB9_MongoDB.pdf, PDF page(s) 11.

### Q16. What is the main read-time advantage of the slide’s embedded film document over the five-table relational representation?

A. It eliminates the need for indexes on title.
B. It automatically synchronizes actors across every film.
C. It guarantees that actors have unique names.
D. A single findOne can return the complete object without four JOINs.

**Answer: D**
**Explanation:** The case study contrasts four SQL JOINs and regrouping with one MongoDB document already shaped for the app.
**Source:** DB9_MongoDB.pdf, PDF page(s) 12.

### Q17. What write-time problem can appear when actor names are embedded in multiple film documents?

A. Every actor must have a separate ObjectId collection.
B. A name change may require updating many film documents.
C. A single-document update cannot modify nested objects.
D. Embedding turns every film query into a cross-shard JOIN.

**Answer: B**
**Explanation:** Embedding copies actor information into each film and introduces duplication/update maintenance.
**Source:** DB9_MongoDB.pdf, PDF page(s) 12.

### Q18. Which conclusion about “schema-less” is most accurate?

A. MongoDB rejects documents with different field sets by default.
B. MongoDB never checks field types even when validators exist.
C. Documents can have different shapes; application logic or optional validation still enforces expectations.
D. The schema is always generated from the first inserted document.

**Answer: C**
**Explanation:** The slide distinguishes schema-on-read from absence of all schema and shows optional $jsonSchema validation.
**Source:** DB9_MongoDB.pdf, PDF page(s) 13.

### Q19. A typo stores “titel” instead of “title” in one film document. Which approach shown in the slide would directly prevent such missing required title fields?

A. Configure $jsonSchema to require the title field.
B. Switch the _id type from integer to ObjectId.
C. Add a compound index on length and rating.
D. Use $lookup whenever a film is inserted.

**Answer: A**
**Explanation:** The sample validator uses required: ["title"] to enforce presence of the expected field.
**Source:** DB9_MongoDB.pdf, PDF page(s) 13.

### Q20. Which statement correctly describes a MongoDB ObjectId?

A. A 16-byte key supplied by a centralized serial counter.
B. A random UUIDv4 with no timestamp component.
C. A 12-byte server-assigned sequence requiring a round-trip.
D. A 12-byte identifier with timestamp, process-random bytes, and a counter.

**Answer: D**
**Explanation:** ObjectId is 12 bytes: 4-byte timestamp, 5-byte random component, 3-byte counter; it can be generated client-side.
**Source:** DB9_MongoDB.pdf, PDF page(s) 14.

### Q21. What is the approximate benefit of client-generated ObjectIds for distributed workloads?

A. All documents on separate shards receive contiguous integer keys.
B. Identifiers can be generated without contacting a central counter.
C. Identifiers permanently encode their physical shard location.
D. ObjectIds guarantee global chronological ordering across all clients.

**Answer: B**
**Explanation:** The slide emphasizes generating identifiers on the client, avoiding a central sequence, and only roughly sorting by creation time.
**Source:** DB9_MongoDB.pdf, PDF page(s) 14.

### Q22. According to the slide’s rule of thumb, which architecture is favored for an application whose data is mostly relational with a few flexible attributes?

A. Store every entity in MongoDB with a separate referenced collection.
B. Store only plain SQL tables and reject JSON input.
C. Keep PostgreSQL and use JSONB for the flexible fields.
D. Replace SQL joins with MongoDB aggregation for every request.

**Answer: C**
**Explanation:** The lecture recommends PostgreSQL plus JSONB if roughly 90% of the data is relational.
**Source:** DB9_MongoDB.pdf, PDF page(s) 15.


## Schema design: embed or reference

### Q23. What should drive document schema design according to the lecture’s golden rule?

A. The queries and screens that access data together.
B. The largest possible number of normalized entity tables.
C. The current number of database replicas.
D. The alphabetical order of document field names.

**Answer: A**
**Explanation:** The golden rule is to store data together when accessed together and design around access patterns.
**Source:** DB9_MongoDB.pdf, PDF page(s) 17.

### Q24. Which relationship is the clearest candidate for embedding?

A. One customer with millions of historical rentals.
B. One sensor with readings recorded each second indefinitely.
C. One actor reused in thousands of frequently updated catalogs.
D. One customer with one address routinely read with the profile.

**Answer: D**
**Explanation:** Embedding is appropriate for bounded, dependent information read with its parent, such as a customer address.
**Source:** DB9_MongoDB.pdf, PDF page(s) 18.

### Q25. Which relationship is best handled by referencing?

A. A film with five special features read with every film page.
B. A customer with an unbounded history of rentals queried independently.
C. An order containing one fixed shipping address.
D. A profile containing three shipping addresses.

**Answer: B**
**Explanation:** Referencing suits independently accessed or unbounded child records, including customer rentals.
**Source:** DB9_MongoDB.pdf, PDF page(s) 19.

### Q26. What integrity drawback of a simple MongoDB reference is identified in the lecture?

A. Each referenced child is automatically copied into the parent.
B. References force synchronous cross-shard transactions.
C. A reference can point to a non-existent _id because there is no built-in foreign-key check.
D. All references must be strings rather than numbers.

**Answer: C**
**Explanation:** The example permits a customer_id that has no corresponding customer; it does not enforce relational foreign keys.
**Source:** DB9_MongoDB.pdf, PDF page(s) 19.

### Q27. A product has 50,000 reviews, but its page displays only the newest three. Which pattern from the slide fits best?

A. Keep full reviews in a separate collection and embed the newest three in the product.
B. Embed every review in the product to maximize single-document atomicity.
C. Save the reviews as comma-separated strings in product metadata.
D. Put each product in its own database to avoid all lookups.

**Answer: A**
**Explanation:** The decision guide and suggested lab answers recommend the Subset pattern: reference all reviews and embed a bounded recent subset.
**Source:** DB9_MongoDB.pdf, PDF page(s) 20.

### Q28. Students enroll in multiple courses, and each course has many students. Which representation does the decision guide suggest?

A. A single enormous student document for the entire university.
B. Every course as an embedded object in a central singleton document.
C. Automatic SQL foreign keys in both collections.
D. Arrays of related _ids on one or both sides.

**Answer: D**
**Explanation:** The many-to-many row recommends storing arrays of identifiers on one or both sides.
**Source:** DB9_MongoDB.pdf, PDF page(s) 20.

### Q29. In the dvdrental redesign, which three collections remain after reducing fifteen SQL tables?

A. actors, categories, payments
B. films, rentals, customers
C. films, film_actor, addresses
D. customers, stores, categories

**Answer: B**
**Explanation:** The case study retains films, rentals and customers; related low-cardinality data is embedded.
**Source:** DB9_MongoDB.pdf, PDF page(s) 21.

### Q30. Why are film and customer links retained inside rental documents rather than embedding all rentals in customers?

A. The rental_date field cannot be stored in an embedded object.
B. Every rental belongs to multiple customers at once.
C. Customer rental histories can grow without bound.
D. MongoDB has a restriction against nesting arrays inside customers.

**Answer: C**
**Explanation:** The slide states that customers can have unbounded rental histories, so rental records reference films and customers.
**Source:** DB9_MongoDB.pdf, PDF page(s) 21.

### Q31. Why is an ever-growing rentals array inside a customer considered an anti-pattern?

A. The parent continually grows, increasing update cost and risking the 16 MB limit.
B. MongoDB cannot query any nested arrays by field name.
C. An array prevents use of a unique _id on the parent.
D. An array automatically becomes a separate collection.

**Answer: A**
**Explanation:** The anti-pattern slide warns that unbounded arrays enlarge documents and eventually hit the size cap.
**Source:** DB9_MongoDB.pdf, PDF page(s) 22.

### Q32. A widely shared product price changes daily. Why may duplicating it across one million documents be harmful?

A. MongoDB indexes cannot include numeric prices.
B. Frequent price changes always force a schema migration.
C. It guarantees that all copies update atomically without a transaction.
D. Keeping many copies synchronized creates an expensive update burden.

**Answer: D**
**Explanation:** The slide calls embedding hot, shared data an anti-pattern due to widespread updates.
**Source:** DB9_MongoDB.pdf, PDF page(s) 22.

### Q33. An LLM conversation usually contains 20 messages and the application always loads the whole thread. What does the suggested answer recommend?

A. Store every message as a distinct document no matter how short the conversation.
B. Embed messages in the conversation; bucket very long threads.
C. Create a relational junction table between each token and the conversation.
D. Store all users’ conversations in a single shared document.

**Answer: B**
**Explanation:** The suggested answers embed a bounded group of messages read together, with bucketing for very long chats.
**Source:** DB9_MongoDB.pdf, PDF page(s) 24.

### Q34. An IoT sensor produces one reading per second for years. Which design best matches the suggested answer?

A. Embed every reading in the sensor document indefinitely.
B. Overwrite the most recent sensor value and discard historical data.
C. Keep readings as children in separate documents or time buckets.
D. Use a MongoDB validator to raise the document size limit.

**Answer: C**
**Explanation:** The lab recommends references from child readings or hourly buckets, never an unbounded parent array.
**Source:** DB9_MongoDB.pdf, PDF page(s) 24.

### Q35. An application’s most frequent request needs $lookup across two collections. What does the anti-pattern slide suggest reviewing?

A. Whether the model should embed more data for that common access path.
B. Whether an ObjectId should be replaced with a UUIDv4 everywhere.
C. Whether each user should receive a new database instance.
D. Whether to disable every index on foreign fields.

**Answer: A**
**Explanation:** The slide explicitly says to reconsider document design when the hottest query frequently needs $lookup.
**Source:** DB9_MongoDB.pdf, PDF page(s) 22.


## MongoDB querying and aggregation

### Q36. Which MongoDB expression is equivalent to filtering films where rating equals "PG"?

A. db.films.aggregate({ rating: "PG" })
B. db.films.find({ rating: "PG" })
C. db.films.find({ $group: "PG" })
D. db.films.updateOne({ rating: "PG" })

**Answer: B**
**Explanation:** The CRUD comparison maps SELECT ... WHERE rating=PG to find({ rating: "PG" }).
**Source:** DB9_MongoDB.pdf, PDF page(s) 26.

### Q37. How should the query return film titles without returning _id?

A. { title: -1, _id: 1 }
B. { title: true, _id: true }
C. { title: 0, _id: 0 }
D. { title: 1, _id: 0 }

**Answer: D**
**Explanation:** The projection example includes title with 1 and excludes _id with 0.
**Source:** DB9_MongoDB.pdf, PDF page(s) 26.

### Q38. Which find filter selects PG-13 films longer than 120 minutes?

A. { rating: "PG-13", length: { $gt: 120 } }
B. { rating: "PG-13", length: { $lt: 120 } }
C. { rating: ["PG-13"], length: { $gte: 0 } }
D. { $or: [{ rating: "PG-13" }, { length: { $gt: 120 } }] }

**Answer: A**
**Explanation:** Separate filter fields are ANDed; $gt selects lengths strictly greater than 120.
**Source:** DB9_MongoDB.pdf, PDF page(s) 27.

### Q39. Which filter correctly selects customers whose embedded address has country equal to Japan?

A. { address: "Japan" }
B. { country: { address: "Japan" } }
C. { "address.country": "Japan" }
D. { $lookup: { country: "Japan" } }

**Answer: C**
**Explanation:** Dot notation targets nested fields, and the dotted key is quoted in the slide.
**Source:** DB9_MongoDB.pdf, PDF page(s) 27.

### Q40. What does db.films.find({ "actors.name": "Jayne Nolte" }) match?

A. Only films with exactly one actor and no other actor fields.
B. Films where at least one embedded actor has that name.
C. Documents whose entire actors array equals the string.
D. Actor documents from a separate actors collection only.

**Answer: B**
**Explanation:** MongoDB can match a field within an array of embedded sub-documents without $unwind or a JOIN.
**Source:** DB9_MongoDB.pdf, PDF page(s) 27.

### Q41. Which operator expresses rating being either G or PG?

A. { rating: { $gt: ["G", "PG"] } }
B. { rating: { $and: ["G", "PG"] } }
C. { rating: { $exists: ["G", "PG"] } }
D. { rating: { $in: ["G", "PG"] } }

**Answer: D**
**Explanation:** The slide uses $in to test membership in a given list of rating values.
**Source:** DB9_MongoDB.pdf, PDF page(s) 27.

### Q42. What happens when updateOne applies $set, $push, and $inc to one matching document?

A. Those modifications to the document are applied atomically together.
B. Each operator always creates an independent multi-document transaction.
C. Only the first modifier runs; the remaining modifiers are ignored.
D. The document is replaced completely with only modified fields.

**Answer: A**
**Explanation:** MongoDB provides all-or-nothing atomicity for updates to a single document.
**Source:** DB9_MongoDB.pdf, PDF page(s) 28.

### Q43. Which update operator removes a matching element from an existing array?

A. $inc
B. $set
C. $pull
D. $project

**Answer: C**
**Explanation:** The update slide states that $pull removes array elements; $push appends them.
**Source:** DB9_MongoDB.pdf, PDF page(s) 28.

### Q44. Which sequence correctly filters, aggregates, orders, and limits documents in a pipeline?

A. $project → $lookup → $unwind → $match
B. $match → $group → $sort → $limit
C. $group → $limit → $match → $lookup
D. $limit → $sort → $match → $group

**Answer: B**
**Explanation:** The basic pipeline depicts collection → $match → $group → $sort → $limit, with filtering before heavy stages.
**Source:** DB9_MongoDB.pdf, PDF page(s) 29.

### Q45. Which stage is the closest analogue to SQL GROUP BY?

A. $unwind
B. $lookup
C. $project
D. $group

**Answer: D**
**Explanation:** $group groups documents and computes aggregates such as $sum, $avg and $max.
**Source:** DB9_MongoDB.pdf, PDF page(s) 29.

### Q46. In an aggregation expression, what is the difference between "$amount" and "amount"?

A. "$amount" reads the amount field; "amount" is a literal string.
B. Both always refer to the amount field.
C. "amount" reads the field; "$amount" is a literal string.
D. Both are invalid inside $sum.

**Answer: A**
**Explanation:** The top-spenders example explicitly distinguishes field-path expressions using $ from string literals.
**Source:** DB9_MongoDB.pdf, PDF page(s) 30.

### Q47. What role does $match play when it follows a $group and filters an aggregate count?

A. It changes each grouped document back into its original rows.
B. It generates a new grouping key.
C. It acts like HAVING on grouped results.
D. It automatically joins the grouped output to customers.

**Answer: C**
**Explanation:** The pipeline example uses $match after $group to implement HAVING COUNT(*) >= 5.
**Source:** DB9_MongoDB.pdf, PDF page(s) 30.

### Q48. A $lookup stage does not find a matching film for one rental. What happens to its output field?

A. The input rental is always removed automatically.
B. The output field contains an empty array.
C. The output field contains a SQL NULL instead of an array.
D. The stage raises a foreign-key violation.

**Answer: B**
**Explanation:** $lookup behaves like a left outer join and emits an array, which is empty when nothing matches.
**Source:** DB9_MongoDB.pdf, PDF page(s) 31.

### Q49. Which $lookup attribute denotes the matching field in the other collection?

A. as
B. localField
C. from
D. foreignField

**Answer: D**
**Explanation:** foreignField identifies the match key in the foreign collection; localField names the input key.
**Source:** DB9_MongoDB.pdf, PDF page(s) 31.

### Q50. An explain plan changes from COLLSCAN to FETCH with an IXSCAN input after creating an index. What does this indicate?

A. The query now uses an index to find candidates and fetches matching documents.
B. The collection is permanently sorted in memory.
C. The query has stopped reading documents and returns only index definitions.
D. The optimizer has disabled all document filtering.

**Answer: A**
**Explanation:** The indexing slide compares COLLSCAN with IXSCAN plus FETCH after createIndex on customer_id.
**Source:** DB9_MongoDB.pdf, PDF page(s) 32.

### Q51. Why does an index on an array field become a multikey index?

A. It creates a separate collection for each array element.
B. It only supports single values, forcing arrays to be rejected.
C. It can add an index entry for each array element.
D. It compresses every array into one unsearchable binary value.

**Answer: C**
**Explanation:** The slide explains that a multikey index on arrays has entries for individual elements.
**Source:** DB9_MongoDB.pdf, PDF page(s) 32.

### Q52. Which workload does the lecture present as a relatively poor fit for MongoDB?

A. Product catalogs with varying attributes.
B. Banking ledgers requiring multi-entity transactions and strict integrity.
C. LLM conversations stored as bounded documents.
D. ML experiment metadata with variable fields.

**Answer: B**
**Explanation:** The good-fit/poor-fit table lists banking ledgers with multi-entity transactions and strict integrity as poor fits.
**Source:** DB9_MongoDB.pdf, PDF page(s) 33.


## Hands-on lab and applied MQL

### Q53. Which restriction applies specifically to the Mongo Playground environment described in the lab?

A. It supports unlimited documents and persists all updates between runs.
B. It requires MongoDB Atlas credentials for every query.
C. It only supports SQL SELECT statements.
D. It does not support chaining .sort() or .limit() after find(); use aggregate stages.

**Answer: D**
**Explanation:** The Playground lab notes supported operations and says to replace chained find sorting/limits with aggregate stages.
**Source:** DB9_MongoDB.pdf, PDF page(s) 35.

### Q54. What is the document count of the rentals collection in the provided lab slice?

A. 48
B. 52
C. 599
D. 16,044

**Answer: A**
**Explanation:** The sample dataset table lists 48 rentals, 52 films, and 8 customers. 16,044 is the full dataset rental count.
**Source:** DB9_MongoDB.pdf, PDF page(s) 36.

### Q55. According to the lab solution, which pair of customers lives in the United States?

A. Mary Smith and Linda Williams
B. Jennifer Davis and Mary Smith
C. Patricia Johnson and Jennifer Davis
D. Linda Williams and Patricia Johnson

**Answer: C**
**Explanation:** The worked solution identifies Patricia Johnson (San Bernardino) and Jennifer Davis (Laredo).
**Source:** DB9_MongoDB.pdf, PDF page(s) 38.

### Q56. Why does the lab sort category counts with { n: -1, _id: 1 } instead of only { n: -1 }?

A. To combine every category into one total.
B. To break count ties consistently using the category key.
C. To sort counts ascending and names descending.
D. To preserve the physical insertion order of all films.

**Answer: B**
**Explanation:** L4 sorts descending by count and ascending by category _id; the slide notes tied categories at five films.
**Source:** DB9_MongoDB.pdf, PDF page(s) 40.

### Q57. Which three customers have the highest totals in the provided lab results?

A. Customers 1, 2, 3 in that order.
B. Customers 6, 2, 1 in that order.
C. Customers 3, 1, 2 in that order.
D. Customers 3, 2, 1 in that order.

**Answer: D**
**Explanation:** The L5 solution gives customer 3 = 35.94, customer 2 = 29.94, and customer 1 = 27.94.
**Source:** DB9_MongoDB.pdf, PDF page(s) 40.

### Q58. Why does the lab use $round on total rental payments?

A. Binary floating-point values can display small representation errors, so totals are rounded to two decimals.
B. MongoDB aggregation cannot add decimal values without rounding each input.
C. Rounding is needed to satisfy a required document _id type.
D. Rounding automatically turns each result into a Decimal128 value.

**Answer: A**
**Explanation:** The slide shows a binary-double artifact such as 12.940000000000001 and separately recommends Decimal128 for money.
**Source:** DB9_MongoDB.pdf, PDF page(s) 40.

### Q59. Why is $lookup placed after $limit in the customer top-spenders solution?

A. To avoid computing $sum across all 48 rentals.
B. Because $lookup cannot operate before $sort in MongoDB.
C. To join only the top three grouped customers instead of all grouped entries.
D. Because $unwind must always be the first aggregation stage.

**Answer: C**
**Explanation:** The worked solution reduces the input to three top customers before $lookup, lowering join work.
**Source:** DB9_MongoDB.pdf, PDF page(s) 41.

### Q60. In the lab update, which combination changes film 1’s rental_rate and appends "Commentaries" to special_features?

A. { $inc: { rental_rate: 1.99 }, $pull: { special_features: "Commentaries" } }
B. { $set: { rental_rate: 1.99 }, $push: { special_features: "Commentaries" } }
C. { $push: { rental_rate: 1.99 }, $set: { special_features: "Commentaries" } }
D. { $unset: { rental_rate: 1.99 }, $add: { special_features: "Commentaries" } }

**Answer: B**
**Explanation:** $set assigns the new rental_rate; $push appends the feature to the array in one update.
**Source:** DB9_MongoDB.pdf, PDF page(s) 41.

### Q61. Two actors share the name “Susan Davis.” What should an aggregation use to distinguish their film counts?

A. Group by the literal string "Susan Davis".
B. Group by the film category rather than actor.
C. Group by actors.name only, then count all films together.
D. Group by each actor’s actor_id rather than their shared name.

**Answer: D**
**Explanation:** Self-practice E3 asks students to compare grouping by actors.name versus actors.actor_id; identifiers distinguish people with the same name.
**Source:** DB9_MongoDB.pdf, PDF page(s) 42.

### Q62. To list films that were never rented, which pattern does the self-practice hint suggest?

A. Start from films, $lookup rentals, then test the matches with $size.
B. Start from rentals and use $inc to reconstruct unseen films.
C. Search customers for films with missing address fields.
D. Update each film with a rental count and delete zero-count records.

**Answer: A**
**Explanation:** E2 explicitly suggests a lookup from films to rentals followed by a $size test for no matches.
**Source:** DB9_MongoDB.pdf, PDF page(s) 42.

---

## Quality checks

- 62 unique IDs; four options and one correct answer per question.
- All answers grounded in the lecture, including worked lab results.
- Page citations use physical PDF numbering; slide footer numbers differ.
- Mongo Playground constraints apply to that teaching environment, not necessarily to mongosh.
- JSON is a neutral import format; map its keys to the existing `session-9.ts` interface before integration.
