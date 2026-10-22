# Session 8: Distributed Databases and the CAP Theorem

**Source:** `DB8 (1).pdf` (34 PDF pages). **Total:** 63 single-answer multiple-choice questions. Page numbers below refer to PDF page numbers rather than the internal slide counter. Questions, answers and explanations are in English.

- Why distributed?: 7 questions
- Replication: 16 questions
- Sharding: 13 questions
- CAP theorem: 15 questions
- Hands-on lab: 12 questions

---

## Why distributed?

### Question 1

What limitation of the single-node PostgreSQL setup motivates distributed databases in the lecture?

A. Single nodes cannot enforce ACID properties.

B. Hardware failure or excessive demand can disrupt the whole service.

C. A single instance cannot create B-Tree indexes.

D. Single-node databases cannot store AI features.

**Correct answer:** B. Hardware failure or excessive demand can disrupt the whole service.

**Explanation:** The recap raises SSD failure and one million simultaneous requests as single-machine risks.

**Source:** `DB8 (1).pdf`, PDF page 4.

### Question 2

A team adds CPU cores and RAM to its existing database server without introducing other nodes. Which strategy is this?

A. Horizontal scaling

B. Database sharding

C. Vertical scaling

D. Read replication

**Correct answer:** C. Vertical scaling

**Explanation:** Scale-up adds resources to an existing server rather than adding servers.

**Source:** `DB8 (1).pdf`, PDF page 6.

### Question 3

Which combination is identified as a drawback of vertical scaling?

A. Hardware ceiling and a remaining single point of failure

B. Additional cross-shard joins and resharding

C. Replica lag and replica read-only errors

D. Complex routing among hundreds of nodes

**Correct answer:** A. Hardware ceiling and a remaining single point of failure

**Explanation:** Scale-up faces physical hardware limits and does not eliminate the single point of failure.

**Source:** `DB8 (1).pdf`, PDF page 6.

### Question 4

Which change best illustrates horizontal scaling?

A. Replacing a disk with a larger SSD

B. Increasing RAM on the primary

C. Changing the isolation level

D. Adding standard servers that operate as one logical service

**Correct answer:** D. Adding standard servers that operate as one logical service

**Explanation:** Scale-out connects multiple commodity servers to act as a logical unit.

**Source:** `DB8 (1).pdf`, PDF page 7.

### Question 5

Which benefit of horizontal scaling is especially relevant when one server unexpectedly fails?

A. All requests must wait for the failed node to recover.

B. Other nodes can continue serving the workload.

C. Transactions automatically become Serializable.

D. The system no longer requires network communication.

**Correct answer:** B. Other nodes can continue serving the workload.

**Explanation:** The lecture associates scale-out with high availability through multiple nodes.

**Source:** `DB8 (1).pdf`, PDF page 7.

### Question 6

A single-server service goes offline whenever its operating system must reboot for security patches. Which problem does this illustrate?

A. A hash collision

B. A cross-shard transaction

C. A single point of failure

D. Eventual consistency

**Correct answer:** C. A single point of failure

**Explanation:** A single node creates maintenance downtime as well as hardware and software failure exposure.

**Source:** `DB8 (1).pdf`, PDF page 8.

### Question 7

Compared with scale-up, what additional operational cost is emphasized for scale-out?

A. Increased network and coordination complexity

B. A strict limit imposed by one motherboard

C. An inability to use inexpensive servers

D. The need to store everything on one disk

**Correct answer:** A. Increased network and coordination complexity

**Explanation:** The comparison table notes that horizontal scaling has greater complexity because of network overhead.

**Source:** `DB8 (1).pdf`, PDF page 9.

## Replication

### Question 8

In database replication, what is copied between servers?

A. Only SQL execution plans

B. Only user authentication settings

C. Distinct nonoverlapping subsets of rows

D. Copies of database information maintained on different machines

**Correct answer:** D. Copies of database information maintained on different machines

**Explanation:** Replication maintains multiple copies of data on different physical servers.

**Source:** `DB8 (1).pdf`, PDF page 11.

### Question 9

Which pair of objectives motivates replication in the slides?

A. Removing all indexes and eliminating transactions

B. Improving fault tolerance and read performance

C. Avoiding schemas and preventing any network failure

D. Reducing database size through horizontal partitioning

**Correct answer:** B. Improving fault tolerance and read performance

**Explanation:** The lecture lists reliability/fault tolerance and read performance as motivations.

**Source:** `DB8 (1).pdf`, PDF page 11.

### Question 10

In the primary-replica model presented, which node normally accepts INSERT, UPDATE, and DELETE?

A. The primary

B. Any read-only replica

C. Only the newest replica

D. A dedicated backup server disconnected from the cluster

**Correct answer:** A. The primary

**Explanation:** The primary is the write-capable source of truth; replicas serve reads and synchronize.

**Source:** `DB8 (1).pdf`, PDF page 12.

### Question 11

What role do replicas play in the lecture’s primary-replica architecture?

A. Assign unique subsets of user IDs

B. Commit independent authoritative writes

C. Serve reads and synchronize changes from the primary

D. Replace all write-ahead logging

**Correct answer:** C. Serve reads and synchronize changes from the primary

**Explanation:** Replicas are synchronized read-serving nodes.

**Source:** `DB8 (1).pdf`, PDF page 12.

### Question 12

A recommendation API has approximately 100 reads per write. What is the lecture’s proposed way to reduce primary load?

A. Execute all reads within a single write transaction.

B. Send all feature lookups to the primary.

C. Shard the schema into separate databases on the same server.

D. Distribute SELECT queries over multiple read replicas.

**Correct answer:** D. Distribute SELECT queries over multiple read replicas.

**Explanation:** Read-scale architecture distributes SELECT operations among replicas so the primary can focus on writes.

**Source:** `DB8 (1).pdf`, PDF page 13.

### Question 13

Why are read replicas useful during model inference?

A. They guarantee that each feature vector is globally unique.

B. They can serve feature-vector retrieval requests.

C. They eliminate the need for all database indexes.

D. They automatically synchronize model weights.

**Correct answer:** B. They can serve feature-vector retrieval requests.

**Explanation:** The AI inference use case in the slide fetches feature vectors through replicas.

**Source:** `DB8 (1).pdf`, PDF page 13.

### Question 14

When does the primary acknowledge a commit under the synchronous replication model described in the slides?

A. Before producing any WAL records

B. Immediately after receiving a client query

C. After receiving the required replica confirmation

D. Only after every replica has been restarted

**Correct answer:** C. After receiving the required replica confirmation

**Explanation:** Synchronous replication requires a replica acknowledgement before commit completion.

**Source:** `DB8 (1).pdf`, PDF page 14.

### Question 15

What failure risk is highlighted for synchronous replication if the required replica is unavailable?

A. Writes may be blocked while the primary waits for confirmation.

B. Previously committed rows are automatically deleted.

C. The primary silently switches to sharding.

D. Read-only queries on the primary become illegal.

**Correct answer:** A. Writes may be blocked while the primary waits for confirmation.

**Explanation:** The trade-off described is increased write latency and potential write unavailability.

**Source:** `DB8 (1).pdf`, PDF page 14.

### Question 16

In asynchronous replication, what may happen before a replica receives the latest update?

A. The replica must reject every SELECT.

B. The primary waits for all replicas to confirm.

C. The cluster changes its sharding key.

D. The primary successfully commits locally.

**Correct answer:** D. The primary successfully commits locally.

**Explanation:** Asynchronous replication commits first and ships changes to replicas afterward.

**Source:** `DB8 (1).pdf`, PDF page 15.

### Question 17

An asynchronous primary crashes just after committing, before sending its newest change. What risk follows?

A. The last commit must already be on all replicas.

B. The newest committed change may be missing from replicas.

C. All replica reads become serializable.

D. The primary automatically rolls back all earlier commits.

**Correct answer:** B. The newest committed change may be missing from replicas.

**Explanation:** The slide identifies data-loss risk if the primary fails before propagation.

**Source:** `DB8 (1).pdf`, PDF page 15.

### Question 18

A replica briefly returns an older customer balance while the primary has the new balance. Which replication trade-off does this show?

A. A local partitioning error

B. A SQL parser malfunction

C. Replication lag under asynchronous propagation

D. A guaranteed two-phase commit failure

**Correct answer:** C. Replication lag under asynchronous propagation

**Explanation:** Asynchronous replicas can temporarily lag behind the primary.

**Source:** `DB8 (1).pdf`, PDF page 15.

### Question 19

What is failover in a primary-replica cluster?

A. Promoting a replica to become the new writable primary

B. Moving every row to a newly selected shard

C. Increasing the RAM on the failed node

D. Restarting all nodes in a fixed round-robin order

**Correct answer:** A. Promoting a replica to become the new writable primary

**Explanation:** Failover replaces a failed primary by promoting a replica.

**Source:** `DB8 (1).pdf`, PDF page 16.

### Question 20

Which sequence follows the failover workflow described in the slides?

A. Promotion → detection → election → reconfiguration

B. Election → reconfiguration → detection → promotion

C. Reconfiguration → promotion → election → detection

D. Detection → election → promotion → reconfiguration

**Correct answer:** D. Detection → election → promotion → reconfiguration

**Explanation:** The four listed steps occur in that order.

**Source:** `DB8 (1).pdf`, PDF page 16.

### Question 21

Which tools are explicitly mentioned as options for automating PostgreSQL failover?

A. pgAdmin and psql

B. Patroni and Repmgr

C. Docker and SQLAlchemy

D. HBase and CouchDB

**Correct answer:** B. Patroni and Repmgr

**Explanation:** Patroni and Repmgr appear in the failover slide.

**Source:** `DB8 (1).pdf`, PDF page 16.

### Question 22

For large AI training jobs, what deployment choice is recommended in the lecture?

A. Perform every bulk read against the writable primary.

B. Disable replication to maximize concurrency.

C. Read large datasets from read replicas to reduce pressure on production.

D. Place all training features on a single unreplicated node.

**Correct answer:** C. Read large datasets from read replicas to reduce pressure on production.

**Explanation:** Training data can be read from replicas to avoid stressing the production primary.

**Source:** `DB8 (1).pdf`, PDF page 17.

### Question 23

Why might a global inference service deploy replicas in multiple geographic regions?

A. To reduce data-access latency near users

B. To force all writes to cross every region

C. To avoid using network links

D. To make row identifiers sequential

**Correct answer:** A. To reduce data-access latency near users

**Explanation:** Geographic replication is used to reduce latency for local inference users.

**Source:** `DB8 (1).pdf`, PDF page 17.

## Sharding

### Question 24

Which statement correctly distinguishes sharding from replication?

A. Sharding copies every row to every node; replication splits rows.

B. Both strategies necessarily keep identical data on every node.

C. Sharding affects only indexes, while replication affects tables.

D. Sharding distributes different subsets; replication maintains copies.

**Correct answer:** D. Sharding distributes different subsets; replication maintains copies.

**Explanation:** Shards hold unique subsets of a logical dataset, unlike replicas that maintain copies.

**Source:** `DB8 (1).pdf`, PDF page 19.

### Question 25

A dataset of ten billion rows is split into ten data subsets on different servers. Which concept best matches the lecture?

A. Synchronous replication

B. Database sharding

C. Vertical scaling

D. Materialized views

**Correct answer:** B. Database sharding

**Explanation:** The slide presents the ten-billion-row example as a use case for sharding.

**Source:** `DB8 (1).pdf`, PDF page 19.

### Question 26

A table is divided into smaller tables, but all partitions remain in the same PostgreSQL instance. What is this called?

A. Local horizontal partitioning

B. Distributed sharding

C. Read replication

D. Cross-region failover

**Correct answer:** A. Local horizontal partitioning

**Explanation:** Local horizontal partitioning operates within one database instance; sharding distributes pieces across nodes.

**Source:** `DB8 (1).pdf`, PDF page 20.

### Question 27

Compared with local horizontal partitioning, what capability is added by sharding?

A. Automatic foreign keys across all servers

B. Guaranteed zero-latency joins

C. Scaling CPU and RAM resources across multiple machines

D. A requirement that each server has identical rows

**Correct answer:** C. Scaling CPU and RAM resources across multiple machines

**Explanation:** Sharding can distribute work and data over multiple physical servers.

**Source:** `DB8 (1).pdf`, PDF page 20.

### Question 28

What determines the destination shard for an individual record?

A. The newest available replica

B. The transaction isolation level

C. The number of SELECT columns

D. The value and routing rule of the sharding key

**Correct answer:** D. The value and routing rule of the sharding key

**Explanation:** The sharding key is the column used to assign a row to a shard.

**Source:** `DB8 (1).pdf`, PDF page 21.

### Question 29

New customer IDs grow sequentially, and the newest IDs always land on the last range shard. What risk is highlighted?

A. The last shard cannot store indexes.

B. That shard becomes a write hotspot.

C. All shards receive exactly the same load.

D. Every query automatically needs two-phase commit.

**Correct answer:** B. That shard becomes a write hotspot.

**Explanation:** Range-based sharding can concentrate new users on one shard.

**Source:** `DB8 (1).pdf`, PDF page 21.

### Question 30

Which formula illustrates hash-based shard assignment in the slides?

A. hash(customer_id) % N

B. customer_id + N

C. MAX(customer_id) / replica_lag

D. SUM(customer_id) OVER (PARTITION BY N)

**Correct answer:** A. hash(customer_id) % N

**Explanation:** The slide uses hash(customer_id) modulo number of shards to distribute rows.

**Source:** `DB8 (1).pdf`, PDF page 21.

### Question 31

Why is choosing the wrong sharding key expensive to correct later?

A. It forces synchronous replication forever.

B. It makes every index unusable by definition.

C. Changing placement may require resharding existing records.

D. It permanently disables failover.

**Correct answer:** C. Changing placement may require resharding existing records.

**Explanation:** Correcting poor distribution can require a costly resharding process.

**Source:** `DB8 (1).pdf`, PDF page 21.

### Question 32

Why should applications avoid frequent cross-shard joins when possible?

A. A join becomes a full database backup.

B. Cross-shard joins never return consistent rows.

C. SQL does not support JOIN syntax in distributed systems.

D. Combining data stored on different servers can be very slow.

**Correct answer:** D. Combining data stored on different servers can be very slow.

**Explanation:** The slide identifies expensive cross-shard joins as an important complexity cost.

**Source:** `DB8 (1).pdf`, PDF page 22.

### Question 33

Which integrity problem is identified when related tables reside on separate shards?

A. All local foreign keys stop working.

B. Cross-shard foreign keys are usually not enforced by the DBMS.

C. Every shard automatically gains duplicate primary keys.

D. Indexes cannot reference any local column.

**Correct answer:** B. Cross-shard foreign keys are usually not enforced by the DBMS.

**Explanation:** The lecture notes that foreign-key constraints across shards are generally unsupported.

**Source:** `DB8 (1).pdf`, PDF page 22.

### Question 34

What is identified as a mechanism for coordinating ACID transactions spanning shards?

A. Two-phase commit

B. A simple read replica

C. A local B-Tree index

D. An HTTP cache

**Correct answer:** A. Two-phase commit

**Explanation:** The lecture cites two-phase commit for distributed transactions and highlights its performance cost.

**Source:** `DB8 (1).pdf`, PDF page 22.

### Question 35

A social network stores each user’s profile and associated activity on the same shard. What is the intended advantage?

A. The primary never needs to commit writes.

B. All users necessarily share one global shard.

C. User-profile queries can access related data locally.

D. The system no longer requires authentication.

**Correct answer:** C. User-profile queries can access related data locally.

**Explanation:** Sharding by user_id co-locates a user’s data and speeds profile retrieval.

**Source:** `DB8 (1).pdf`, PDF page 23.

### Question 36

Which AI-oriented dataset is explicitly cited as a candidate for sharding?

A. A single local configuration file

B. One SQL connection string

C. A small static lookup table

D. Billions of embeddings in a feature store

**Correct answer:** D. Billions of embeddings in a feature store

**Explanation:** Feature stores holding billions of vectors are a stated sharding example.

**Source:** `DB8 (1).pdf`, PDF page 23.

## CAP theorem

### Question 37

According to the lecture, what is the key CAP trade-off when a network partition occurs?

A. Choose whether to keep ACID or SQL support.

B. Choose between consistency and availability.

C. Choose between indexing and replication.

D. Choose between vertical and horizontal scaling.

**Correct answer:** B. Choose between consistency and availability.

**Explanation:** The CAP constraint during partitions is the conflict between strong consistency and availability.

**Source:** `DB8 (1).pdf`, PDF page 25.

### Question 38

Who is credited in the lecture with proposing the CAP theorem in 2000?

A. Eric Brewer

B. Edgar F. Codd

C. Jim Gray

D. Michael Stonebraker

**Correct answer:** A. Eric Brewer

**Explanation:** The introduction credits Eric Brewer in 2000.

**Source:** `DB8 (1).pdf`, PDF page 25.

### Question 39

Which outcome satisfies the lecture’s definition of strong consistency?

A. Every read gets an answer, but it may be arbitrarily old.

B. A read can return a newer value on one node and an older value on another.

C. Each read returns the latest write or an error.

D. Every write is acknowledged before any node stores it.

**Correct answer:** C. Each read returns the latest write or an error.

**Explanation:** Strong consistency is defined as receiving the most recent write or an error.

**Source:** `DB8 (1).pdf`, PDF page 26.

### Question 40

After a bank withdrawal is committed, a remote read is required to reflect the new balance or fail. Which CAP property is prioritized?

A. Availability

B. Partition-free execution

C. Replica count

D. Consistency

**Correct answer:** D. Consistency

**Explanation:** The bank-account analogy illustrates strong consistency across nodes.

**Source:** `DB8 (1).pdf`, PDF page 26.

### Question 41

Which behavior is consistent with the lecture’s definition of availability?

A. Every request gets a non-error response, potentially with stale data.

B. Every response must contain the most recent value.

C. The service may reject requests until all nodes synchronize.

D. All nodes must commit the same write simultaneously.

**Correct answer:** A. Every request gets a non-error response, potentially with stale data.

**Explanation:** Availability emphasizes a response to every request, even when replicas are out of sync.

**Source:** `DB8 (1).pdf`, PDF page 27.

### Question 42

A feed still opens during a partition but shows an older Like count. Which guarantee is being favored?

A. Strong consistency

B. Availability

C. Serializability

D. Zero-lag replication

**Correct answer:** B. Availability

**Explanation:** The slide’s social-feed analogy shows an available but potentially stale response.

**Source:** `DB8 (1).pdf`, PDF page 27.

### Question 43

What does partition tolerance mean in the CAP theorem as defined in the slides?

A. All servers must store unique subsets of rows.

B. The database cannot operate without a primary.

C. The system continues operating despite dropped or delayed messages between nodes.

D. Network latency is guaranteed to be zero.

**Correct answer:** C. The system continues operating despite dropped or delayed messages between nodes.

**Explanation:** Partition tolerance concerns continued operation when communication between nodes is disrupted.

**Source:** `DB8 (1).pdf`, PDF page 28.

### Question 44

Why does the lecture treat partition tolerance as effectively mandatory for distributed systems?

A. It improves the speed of every SQL join.

B. It replaces all consistency constraints.

C. It is a setting that users can turn off.

D. Real networks can fail or split unexpectedly.

**Correct answer:** D. Real networks can fail or split unexpectedly.

**Explanation:** Partitions are treated as unavoidable network faults in real deployments.

**Source:** `DB8 (1).pdf`, PDF page 28.

### Question 45

A partition separates two replicas. One side rejects requests rather than risk serving inconsistent data. Which design priority does this best represent?

A. CP

B. AP

C. CA irrespective of partition

D. Pure read scaling

**Correct answer:** A. CP

**Explanation:** In the lecture, CP preserves consistency during partitions by sacrificing availability for some requests.

**Source:** `DB8 (1).pdf`, PDF page 29.

### Question 46

During a network partition, both sides continue responding even though values may disagree. Which design priority is illustrated?

A. Synchronous replication only

B. AP

C. CP

D. Serializable execution

**Correct answer:** B. AP

**Explanation:** AP maintains non-error responses but permits temporary inconsistency.

**Source:** `DB8 (1).pdf`, PDF page 29.

### Question 47

Which application is placed under CP use cases in the lecture?

A. A social-media Like counter

B. A public comment cache

C. A stock-trading system

D. A feed of noncritical recommendations

**Correct answer:** C. A stock-trading system

**Explanation:** Banking, stock trading and medical records are examples in the CP column.

**Source:** `DB8 (1).pdf`, PDF page 29.

### Question 48

Which application is listed as an AP-oriented use case?

A. Bank balance transfers

B. Trading account settlement

C. Medical patient records

D. Video comments and caching

**Correct answer:** D. Video comments and caching

**Explanation:** YouTube comments, Facebook feeds, and caches appear under AP.

**Source:** `DB8 (1).pdf`, PDF page 29.

### Question 49

How is single-node PostgreSQL characterized in the lecture’s CAP mapping table?

A. A CA-oriented relational system

B. An intrinsically AP distributed system

C. A CP system that never allows reads

D. A sharded NoSQL system

**Correct answer:** A. A CA-oriented relational system

**Explanation:** The table labels PostgreSQL (Single Node) as CA / Pure ACID; this is a lecture classification of a non-distributed setup.

**Source:** `DB8 (1).pdf`, PDF page 30.

### Question 50

Which pair is placed in the AP category in the lecture’s database comparison?

A. PostgreSQL and HBase

B. Cassandra and CouchDB

C. MongoDB and Redis

D. Redis and HBase

**Correct answer:** B. Cassandra and CouchDB

**Explanation:** The CAP-mapping table lists Cassandra and CouchDB under AP.

**Source:** `DB8 (1).pdf`, PDF page 30.

### Question 51

What qualification does the lecture provide about mapping database products to CAP categories?

A. Every product permanently belongs to a single CAP class.

B. CAP classification depends exclusively on SQL syntax.

C. Configurations such as PostgreSQL replication can shift the consistency/availability trade-off.

D. Replication settings never influence distributed behavior.

**Correct answer:** C. Configurations such as PostgreSQL replication can shift the consistency/availability trade-off.

**Explanation:** The slide notes that databases with replication can be tuned toward CP or AP depending on configuration.

**Source:** `DB8 (1).pdf`, PDF page 30.

## Hands-on lab

### Question 52

In the dvdrental Docker lab, which port is assigned to the read-only replica?

A. 5432

B. 3306

C. 6379

D. 5433

**Correct answer:** D. 5433

**Explanation:** The lab assigns port 5432 to the primary and 5433 to the replica.

**Source:** `DB8 (1).pdf`, PDF page 32.

### Question 53

Which component is used to start the preconfigured primary-replica environment?

A. A Docker Compose configuration

B. A PostgreSQL materialized view

C. A sharding-key trigger

D. A standalone machine-learning notebook

**Correct answer:** A. A Docker Compose configuration

**Explanation:** The lab uses Docker Compose to start nodes with streaming replication.

**Source:** `DB8 (1).pdf`, PDF page 32.

### Question 54

Where does the lab direct students to restore the dvdrental sample database?

A. The replica before the primary

B. The primary node

C. Every application client

D. The Docker host outside PostgreSQL

**Correct answer:** B. The primary node

**Explanation:** The specified restore command targets the primary database.

**Source:** `DB8 (1).pdf`, PDF page 32.

### Question 55

Which PostgreSQL configuration setting enables the WAL information needed for replica streaming in the lecture?

A. archive_mode = off

B. max_connections = 1

C. wal_level = replica

D. default_transaction_read_only = off

**Correct answer:** C. wal_level = replica

**Explanation:** The primary postgresql.conf slide explicitly sets wal_level = replica.

**Source:** `DB8 (1).pdf`, PDF page 33.

### Question 56

What is the role of max_wal_senders = 10 in the lecture’s primary configuration?

A. Limit SQL query results to ten rows

B. Create ten independent sharding keys

C. Reserve ten application users

D. Configure capacity for WAL-sending processes

**Correct answer:** D. Configure capacity for WAL-sending processes

**Explanation:** max_wal_senders controls how many WAL sender processes may run.

**Source:** `DB8 (1).pdf`, PDF page 33.

### Question 57

Which file contains the lab’s network authentication entry for a replication user?

A. pg_hba.conf

B. pg_stat_statements

C. docker-compose.log

D. pg_indexes

**Correct answer:** A. pg_hba.conf

**Explanation:** The slide places host replication replicator ... md5 in pg_hba.conf.

**Source:** `DB8 (1).pdf`, PDF page 33.

### Question 58

How does the replica obtain changes from the primary in the lab’s streaming setup?

A. By periodically copying query screenshots

B. By receiving and replaying streamed WAL records

C. By independently executing web-form SQL

D. By rebuilding all tables from CSV per request

**Correct answer:** B. By receiving and replaying streamed WAL records

**Explanation:** The primary streams WAL, which is replayed at the replica.

**Source:** `DB8 (1).pdf`, PDF page 33.

### Question 59

After updating customer.active on the primary, what is the intended verification on the replica?

A. Run pg_restore again before every read.

B. Change the replica into a writable shard.

C. Query the same customer and observe the propagated value.

D. Delete the customer so both nodes match.

**Correct answer:** C. Query the same customer and observe the propagated value.

**Explanation:** The lab checks that the new active value can be read on the replica after replication.

**Source:** `DB8 (1).pdf`, PDF page 34.

### Question 60

Why should DELETE FROM rental fail when executed on the read-only replica in the lab?

A. The rental table has no primary key.

B. Only SELECT queries can be parameterized.

C. Cross-shard joins are unsupported.

D. The replica rejects writes in a read-only transaction.

**Correct answer:** D. The replica rejects writes in a read-only transaction.

**Explanation:** The lab shows a cannot execute DELETE in a read-only transaction error.

**Source:** `DB8 (1).pdf`, PDF page 34.

### Question 61

A project requires low write latency even if a replica is temporarily behind. Which option matches the lecture’s trade-off?

A. Asynchronous replication, accepting possible lag

B. Synchronous replication, waiting for replica acknowledgement

C. A single-node setup with no redundancy

D. Two-phase commit over all read replicas

**Correct answer:** A. Asynchronous replication, accepting possible lag

**Explanation:** Asynchronous mode favors fast commits but admits replication lag; synchronous waits for acknowledgement.

**Source:** `DB8 (1).pdf`, PDF page 14.

### Question 62

An application suffers uneven shard load because new IDs all fall into the highest range. Which alternative does the slide present for more even distribution?

A. Replacing all replicas with one server

B. Hash-based assignment of customer IDs

C. Ordering every table by customer_id

D. Enabling synchronous replication everywhere

**Correct answer:** B. Hash-based assignment of customer IDs

**Explanation:** Hash-based sharding is presented as a way to distribute keys more evenly than ranges.

**Source:** `DB8 (1).pdf`, PDF page 21.

### Question 63

Which statement avoids a common misunderstanding of the CAP theorem?

A. Every distributed system always chooses exactly two properties regardless of failures.

B. A non-partitioned system must reject either all reads or all writes.

C. When a partition occurs, maintaining strong consistency can require rejecting some requests.

D. Partition tolerance means the network will never lose messages.

**Correct answer:** C. When a partition occurs, maintaining strong consistency can require rejecting some requests.

**Explanation:** The lecture specifically frames the C-versus-A choice in the presence of a network partition.

**Source:** `DB8 (1).pdf`, PDF page 25.

