# Database Session 6: Concurrency Control

Primary source: `ConcurrencyControl(1).pdf`. Quiz 4 questions adapted or preserved where explicitly relevant.

## Multiple-choice questions

### Q001. Why is executing every transaction serially unsuitable for a high-traffic e-commerce system?

A. It eliminates transaction durability
B. It creates a throughput bottleneck
C. It prevents SQL queries from using indexes
D. It requires every transaction to roll back

**Correct answer:** B
**Explanation:** Serial execution minimizes conflicts but limits the number of requests processed concurrently.
**Source:** Concurrency Control, PDF page 5

### Q002. What is the primary purpose of concurrency control?

A. To guarantee that each query uses a B-tree
B. To eliminate all waiting time
C. To replace transactions with independent statements
D. To balance isolation and throughput

**Correct answer:** D
**Explanation:** Concurrency control balances concurrent performance against interference between transactions.
**Source:** Concurrency Control, PDF page 6

### Q003. Which outcome is most likely when throughput is increased through unrestricted parallel execution?

A. More risk of concurrency errors
B. Automatic serialization of all operations
C. Elimination of write conflicts
D. Guaranteed zero blocking and zero errors

**Correct answer:** A
**Explanation:** Unprotected interleaving can introduce dirty, non-repeatable, and phantom reads.
**Source:** Concurrency Control, PDF page 6-7

### Q004. Which statement accurately characterizes a dirty read?

A. A transaction reads another transaction's uncommitted change
B. A transaction rereads its own committed update
C. A transaction sees a newly committed matching row
D. A transaction reads the same row twice with different committed values

**Correct answer:** A
**Explanation:** A dirty read involves data written by another transaction before that transaction commits.
**Source:** Concurrency Control, PDF page 9

### Q005. T1 changes a balance from 50 to 100 without committing. T2 reads 100, and then T1 rolls back. What did T2 experience?

A. Phantom read
B. Deadlock
C. Dirty read
D. Non-repeatable read

**Correct answer:** C
**Explanation:** T2 read a value that was never committed and was later discarded.
**Source:** Concurrency Control, PDF page 9-10

### Q006. Why can a dirty read cause incorrect inventory decisions?

A. An index is always missing
B. It guarantees that inventory is current
C. It forces all transactions to commit
D. It may use a stock quantity that will be rolled back

**Correct answer:** D
**Explanation:** A reader can act on temporary stock values that disappear after rollback.
**Source:** Concurrency Control, PDF page 11

### Q007. Which event produces a non-repeatable read in the lecture timeline?

A. T2 inserts a new matching row
B. T2 holds an uncommitted update
C. T2 updates an existing row and commits between T1's two reads
D. T1 issues the same SELECT twice without intervening writes

**Correct answer:** C
**Explanation:** A committed update changes the result of rereading an existing row.
**Source:** Concurrency Control, PDF page 12-13

### Q008. A transaction reads balance 50. Another transaction changes it to 100 and commits. The first reads balance 100. Identify the phenomenon.

A. Dirty read
B. Phantom read
C. Deadlock
D. Non-repeatable read

**Correct answer:** D
**Explanation:** The same existing row yields a different committed value at the second read.
**Source:** Concurrency Control, PDF page 12-13

### Q009. How does a phantom read differ from a non-repeatable read in the lecture?

A. A phantom affects a matching set through INSERT/DELETE; a non-repeatable read affects an existing row through UPDATE
B. A phantom always involves uncommitted changes
C. A phantom can occur only after a system crash
D. A non-repeatable read requires a deadlock

**Correct answer:** A
**Explanation:** The slide distinguishes changes in matching row membership from updates to a specific row.
**Source:** Concurrency Control, PDF page 14

### Q010. T1 runs SELECT COUNT(*) FROM users WHERE age > 18 two times. Between them, T2 inserts a user aged 20 and commits. T1 gets 10, then 11. What is this?

A. A lost update, because T2 overwrote a value that T1 wrote
B. A dirty read, because T1 saw data that T2 had not committed
C. A non-repeatable read, because one existing row was updated
D. A phantom read, since the set of matching rows has changed

**Correct answer:** D
**Explanation:** T2 inserts a row that meets T1's predicate, changing the matching set.
**Source:** Concurrency Control, PDF page 15; Quiz 4, Q6

### Q011. T1 counts 8 rows with age > 18. T2 inserts a user aged 16 and commits. Assuming no other changes, what does T1 count on its second read?

A. 9 because all inserts cause phantoms
B. 8 because the inserted row does not satisfy the predicate
C. 7 because existing rows are removed
D. The query must fail due to a deadlock

**Correct answer:** B
**Explanation:** The new row does not satisfy age > 18, so the matching set is unchanged.
**Source:** Concurrency Control, PDF page 14-15

### Q012. T2 deletes one row satisfying T1's WHERE condition and commits between T1's repeated searches. What can happen?

A. A phantom disappearance
B. A dirty read by definition
C. An automatic rollback of T1
D. An X-lock conversion in every session

**Correct answer:** A
**Explanation:** The slide includes DELETE as a cause of phantom reads.
**Source:** Concurrency Control, PDF page 14

### Q013. What does 'pessimistic' mean in the locking mechanism described in the lecture?

A. Transactions never wait
B. A transaction requests a lock before accessing protected data
C. All reads are permanently stored
D. The optimizer predicts that a transaction will fail

**Correct answer:** B
**Explanation:** The DBMS acquires locks before access and blocks on incompatible requests.
**Source:** Concurrency Control, PDF page 18

### Q014. What happens when a requested lock conflicts with an existing lock?

A. The requesting transaction waits
B. The current holder must immediately abort
C. Both locks are granted without checking
D. The requested SQL statement is automatically committed

**Correct answer:** A
**Explanation:** Locking grants compatible requests; incompatible requests are blocked until release.
**Source:** Concurrency Control, PDF page 18

### Q015. Which statement matches the lecture's Shared Lock model?

A. Only one reader can hold it
B. It is reserved for INSERT statements
C. It grants every writer immediate access
D. It permits multiple readers to hold it on the same item

**Correct answer:** D
**Explanation:** S-locks are compatible with other S-locks.
**Source:** Concurrency Control, PDF page 19

### Q016. Which operation is associated with an Exclusive Lock in the lecture's traditional lock model?

A. SELECT used only for reporting
B. A read-only count
C. UPDATE of the protected item
D. Reading a cached result

**Correct answer:** C
**Explanation:** X-locks are used for writes such as UPDATE, INSERT, and DELETE.
**Source:** Concurrency Control, PDF page 20

### Q017. T1 holds a Shared lock on a row. T2 then asks for a Shared lock and T3 asks for an Exclusive lock on the same row. What happens?

A. T2 gets its lock at once, but T3 must wait for the S-lock to end
B. T2 and T3 both have to wait, since only one lock may exist on a row
C. T2 must wait for T1, while T3 gets its lock because writes go first
D. T2 and T3 both get their locks, since reads and writes do not clash

**Correct answer:** A
**Explanation:** In the lecture compatibility matrix, S and S are compatible, but S and X conflict.
**Source:** Concurrency Control, PDF page 21; Quiz 4, Q13

### Q018. Which two lock requests can coexist on the same data item in the slide's matrix?

A. Two X-locks
B. One S-lock and one X-lock
C. Two S-locks
D. Any pair of locks

**Correct answer:** C
**Explanation:** S/S is the only granted pair in the matrix.
**Source:** Concurrency Control, PDF page 21

### Q019. T1 currently holds an X-lock on a data item. What does the lecture's compatibility matrix say about T2's S-lock request?

A. It succeeds immediately
B. It is converted to an X-lock
C. It bypasses the compatibility check
D. It must wait

**Correct answer:** D
**Explanation:** S/X requests conflict in the traditional pessimistic model presented.
**Source:** Concurrency Control, PDF page 21

### Q020. Why does row-level locking have higher overhead than table-level locking?

A. Row locks are only allowed at the Serializable isolation level
B. The DBMS must create and track many more lock objects at once
C. Every row lock must be written to the WAL before a query runs
D. Row locks block the whole table, so other users retry often

**Correct answer:** B
**Explanation:** Smaller lock granularity permits more concurrent operations but increases lock management overhead.
**Source:** Concurrency Control, PDF page 22; Quiz 4, Q4

### Q021. Two transactions update different rows of the same table. Which lock granularity is better suited to allowing both to proceed?

A. Table-level locks
B. Database-wide locks
C. Row-level locks
D. A single global X-lock

**Correct answer:** C
**Explanation:** Row-level granularity allows concurrent updates to different rows.
**Source:** Concurrency Control, PDF page 22

### Q022. Which is a major disadvantage of locking an entire table?

A. Each row requires a separate lock object
B. It prevents all SQL parsing
C. It can block unrelated work on different rows
D. It always triggers a deadlock immediately

**Correct answer:** C
**Explanation:** Table locks have low management overhead but substantially restrict concurrency.
**Source:** Concurrency Control, PDF page 22

### Q023. When is SELECT ... FOR UPDATE especially useful?

A. When application logic reads a value, computes a decision, and later updates the same row
B. When a SELECT must ignore its WHERE clause
C. When a database query must skip transaction boundaries
D. When a report needs to include uncommitted changes

**Correct answer:** A
**Explanation:** It protects the interval between reading a row and updating it.
**Source:** Concurrency Control, PDF page 23

### Q024. An app reads a balance, computes a new value in Python, then runs UPDATE. Why should the first query use SELECT ... FOR UPDATE?

A. It lets other sessions see the new value before the COMMIT happens
B. It locks the row when read, so nobody changes it before the UPDATE
C. It switches the transaction to Serializable until the very end of it
D. It makes the SELECT faster, because the row is put into the cache

**Correct answer:** B
**Explanation:** FOR UPDATE acquires a row lock proactively to close the read-then-write race window.
**Source:** Concurrency Control, PDF page 23; Quiz 4, Q3

### Q025. Which command sequence matches the slide's proactive locking pattern?

A. COMMIT; SELECT ... FOR UPDATE; UPDATE
B. UPDATE; COMMIT; BEGIN
C. BEGIN; SELECT ... FOR UPDATE; UPDATE; COMMIT
D. ROLLBACK; UPDATE; SELECT ... FOR UPDATE

**Correct answer:** C
**Explanation:** The row is locked inside a transaction before the application computes and writes a new value.
**Source:** Concurrency Control, PDF page 23

### Q026. Which situation describes starvation rather than deadlock?

A. A transaction runs out of memory while it holds too many row locks
B. Two transactions wait for each other in a cycle and neither can go on
C. The DBMS rolls back one transaction in order to break a circular wait
D. A writer keeps waiting because readers keep getting S-locks first

**Correct answer:** D
**Explanation:** Starvation describes indefinite waiting caused by repeatedly postponed access, without requiring a wait cycle.
**Source:** Concurrency Control, PDF page 24; Quiz 4, Q12

### Q027. What defines a deadlock?

A. One transaction waits briefly for a writer
B. Two or more transactions form a circular lock-wait dependency
C. A SELECT scans the same table more than once
D. A transaction is automatically committed after a timeout

**Correct answer:** B
**Explanation:** Each transaction in the cycle needs a lock held by another participant and cannot proceed.
**Source:** Concurrency Control, PDF page 26

### Q028. T1 holds a lock on row A and needs row B. T2 holds row B and needs row A. What is the result if neither releases its lock?

A. Phantom read
B. Dirty read
C. A successful serial schedule
D. Deadlock

**Correct answer:** D
**Explanation:** The transactions form a circular wait.
**Source:** Concurrency Control, PDF page 26-27

### Q029. What does an edge T1 → T2 represent in a wait-for graph?

A. T1 has committed before T2
B. T2 must wait for T1's SELECT output
C. T1 requests a lock held by T2
D. T1 and T2 are in different databases

**Correct answer:** C
**Explanation:** Directed edges point from the waiting transaction to the current lock holder.
**Source:** Concurrency Control, PDF page 28

### Q030. Which graph feature indicates deadlock?

A. Any node with one incoming edge
B. A directed cycle
C. More than three active transactions
D. A node without outgoing edges

**Correct answer:** B
**Explanation:** A directed cycle indicates circular waiting.
**Source:** Concurrency Control, PDF page 28

### Q031. A wait-for graph contains T1 → T2 and T2 → T3, but T3 waits for no transaction. What follows?

A. A cycle definitely exists
B. T1 must be aborted immediately
C. T3 must be rolled back
D. No deadlock cycle exists in the given graph

**Correct answer:** D
**Explanation:** A chain of waiting without an edge returning to an earlier node does not form a cycle.
**Source:** Concurrency Control, PDF page 28

### Q032. Why does PostgreSQL wait for deadlock_timeout (about 1 second) before running deadlock detection?

A. The wait gives the user time to cancel one of the transactions
B. Most lock waits end quickly, so checking at once would waste CPU
C. The victim needs one second to write its changes to the WAL first
D. Deadlocks can only be seen after the lock table is saved to disk

**Correct answer:** B
**Explanation:** Delaying cycle detection avoids the expense for brief, ordinary waits.
**Source:** Concurrency Control, PDF page 29; Quiz 4, Q7

### Q033. What happens after PostgreSQL detects a circular wait?

A. It commits every participant
B. It disables all locks for the table
C. It aborts a victim transaction to break the cycle
D. It keeps the deadlock forever

**Correct answer:** C
**Explanation:** Rollback of one participant releases locks so surviving transactions can proceed.
**Source:** Concurrency Control, PDF page 29-30

### Q034. Which message may reach an application whose transaction is chosen as a deadlock victim?

A. Index missing
B. Deadlock detected
C. Materialized view refreshed
D. Table automatically clustered

**Correct answer:** B
**Explanation:** The slide shows PostgreSQL returning ERROR: deadlock detected.
**Source:** Concurrency Control, PDF page 30

### Q035. A wait-for graph has edges T1 → T2, T2 → T3, T3 → T1, and T4 → T1. Which transaction must the DBMS choose its victim from to break the cycle?

A. T4 only
B. All four necessarily
C. One of T1, T2, or T3
D. A transaction not shown in the graph

**Correct answer:** C
**Explanation:** The cycle consists of T1, T2, and T3; aborting a participant breaks that cycle.
**Source:** Concurrency Control, PDF page 28-30; Quiz 4, Q18

### Q036. Why does always updating the row with id = 1 before id = 2 prevent the cross-transfer deadlock?

A. Lower ids use shared locks, so they never conflict with other writers
B. Ordered updates run at the Serializable level, which has no lock wait
C. All transactions ask for locks in the same order, so no cycle forms
D. Postgres frees the first row lock before the second one is requested

**Correct answer:** C
**Explanation:** Consistent lock order prevents circular waiting.
**Source:** Concurrency Control, PDF page 31; Quiz 4, Q14

### Q037. Which development practice reduces the chance of deadlocks?

A. Keeping a transaction open while calling an external API
B. Locking related rows in inconsistent orders
C. Leaving uncommitted writes open during AI training
D. Keeping transactions short

**Correct answer:** D
**Explanation:** Short transactions release locks sooner and reduce conflict windows.
**Source:** Concurrency Control, PDF page 31

### Q038. What is the purpose of proactive locking when rows will be updated later?

A. Force the optimizer to choose a Hash Join
B. Make writes bypass transaction isolation
C. Let other writers overwrite the row temporarily
D. Acquire required locks before dependent application logic

**Correct answer:** D
**Explanation:** SELECT ... FOR UPDATE secures the read-then-write interval.
**Source:** Concurrency Control, PDF page 23,31

### Q039. How does MVCC in PostgreSQL let readers and writers avoid blocking each other?

A. The writer makes a new row version; readers see an old snapshot
B. The reader takes an X-lock first, so the writer queues up behind it
C. The writer changes the row in place and readers retry after a delay
D. Readers read the row from the WAL file instead of from the table

**Correct answer:** A
**Explanation:** MVCC offers snapshot-based reads while writers create new row versions.
**Source:** Concurrency Control, PDF page 34; Quiz 4, Q15

### Q040. What does MVCC stand for?

A. Multi-Value Commit Check
B. Multiple Virtual Client Connections
C. Multi-Version Concurrency Control
D. Memory-Verified Concurrency Check

**Correct answer:** C
**Explanation:** The term in the lecture names PostgreSQL's row-versioning approach to concurrency.
**Source:** Concurrency Control, PDF page 34

### Q041. In Lab 1, Session A updates film_id = 1 but does not commit. Session B tries updating the same row. What happens first?

A. Session B's UPDATE blocks until A releases its row lock
B. Session B silently overwrites A's update
C. Both sessions commit immediately
D. Session A is automatically rolled back

**Correct answer:** A
**Explanation:** Concurrent UPDATEs to the same row conflict; Session B waits for A.
**Source:** Concurrency Control, PDF page 35

### Q042. In Lab 1, what makes Session B's waiting UPDATE able to proceed?

A. Running EXPLAIN
B. Session A committing and releasing its lock
C. Adding an index
D. Starting a third reader session

**Correct answer:** B
**Explanation:** The blocked writer proceeds after A releases its lock on commit.
**Source:** Concurrency Control, PDF page 35

### Q043. In Lab 2 (default Read Committed), Session A reads rental_rate = 4.99, Session B updates it to 0.99 and commits, then A reads 0.99. Why?

A. In Read Committed, each statement sees data committed before it
B. A's first read was cached, and the cache expired between both reads
C. A read B's change before it was committed, which is a dirty read here
D. A holds an X-lock on the row, so it reads B's private copy of the row

**Correct answer:** A
**Explanation:** The lab illustrates that a later statement can observe a newly committed value.
**Source:** Concurrency Control, PDF page 36; Quiz 4, Q10

### Q044. In Lab 3, Session A updates film 100 and then requests film 200; Session B updates film 200 and then requests film 100. What is the essential problem?

A. Both statements modify unrelated columns
B. Each transaction waits for a row held by the other
C. The films lack a primary key
D. Each transaction runs a read-only SELECT

**Correct answer:** B
**Explanation:** The reversed update order creates a cycle of row-lock dependencies.
**Source:** Concurrency Control, PDF page 37

### Q045. In Lab 3, PostgreSQL rolls back one session after detecting deadlock. What should the other session then be able to do?

A. Read the victim's uncommitted changes
B. Proceed after the victim releases locks
C. Permanently disable constraints
D. Automatically skip its remaining updates

**Correct answer:** B
**Explanation:** Rolling back a victim breaks the cycle and frees its held locks.
**Source:** Concurrency Control, PDF page 37

### Q046. In Lab 4, Session B tries SELECT * FROM inventory WHERE inventory_id = 10 FOR UPDATE while Session A holds that row lock. What happens?

A. Session B immediately inserts a rental
B. Session B reads A's uncommitted rental
C. Session B blocks until A releases the lock
D. Session B is forced into autocommit

**Correct answer:** C
**Explanation:** FOR UPDATE requests a conflicting lock and blocks while another transaction holds it.
**Source:** Concurrency Control, PDF page 38

### Q047. Why should the second customer recheck availability after a blocked FOR UPDATE finishes?

A. To detect that the first customer has already rented the same DVD
B. To turn the SELECT into a materialized view
C. To guarantee the primary key changes
D. To avoid creating a row-level lock

**Correct answer:** A
**Explanation:** Once unblocked, application logic must inspect current availability before attempting the rental.
**Source:** Concurrency Control, PDF page 38

### Q048. A developer proposes removing every lock to maximize throughput. Which lecture principle challenges this proposal?

A. Indexes require more storage
B. Unrestricted concurrency can produce data anomalies
C. B-tree nodes must be sorted
D. SQL parsing cannot work concurrently

**Correct answer:** B
**Explanation:** Concurrency control must preserve isolation rather than optimize raw throughput alone.
**Source:** Concurrency Control, PDF page 5-7,33

### Q049. What is the principal side effect introduced by pessimistic locking?

A. It disables transactions
B. Waiting can form deadlocks
C. It makes data immutable
D. It requires sharding

**Correct answer:** B
**Explanation:** Lock acquisition can lead to circular waits when lock orders conflict.
**Source:** Concurrency Control, PDF page 24,33

### Q050. What is the best explanation for why unrelated writers may proceed simultaneously under row-level locking?

A. Different rows can be locked independently
B. All X-locks are mutually compatible
C. COMMIT is unnecessary
D. The same row has no version history

**Correct answer:** A
**Explanation:** Fine-grained locks isolate only the affected rows instead of the entire table.
**Source:** Concurrency Control, PDF page 22,35
