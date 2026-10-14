import type { Chapter } from "@/types/quiz";

export const session4: Chapter = {
  "id": "session-4",
  "title": "Session 4: Window Function",
  "description": "56 câu hỏi đã duyệt về window functions, ranking, frames và ứng dụng phân tích dữ liệu.",
  "revision": 1,
  "questions": [
    {
      "id": "db-s4-q001",
      "prompt": "In the lecture’s comparison, why can a running total expressed with a window function be more efficient than a correlated subquery?",
      "options": [
        {
          "id": "a",
          "text": "It never needs to process the ordered input rows."
        },
        {
          "id": "b",
          "text": "It can sort the rows and process them in a scan rather than repeatedly re-reading groups."
        },
        {
          "id": "c",
          "text": "It automatically changes every table into an index."
        },
        {
          "id": "d",
          "text": "It removes all rows except each group’s final total."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The motivation slide contrasts a typical sort-plus-scan approach (about O(N log N)) with repeated work that can approach O(N²). This is an illustrative comparison, not a guarantee for every plan.",
      "source": "/references/database-window-functions-slides.pdf#page=5",
      "topic": "LO01: Motivation, use cases, and feature engineering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 5,
          "slideNumber": 4,
          "slideTitle": "Motivation: Why Learn Window Functions?"
        }
      ]
    },
    {
      "id": "db-s4-q002",
      "prompt": "A recommendation system needs the three highest-scoring items in each category. Which lecture problem type best describes this task?",
      "options": [
        {
          "id": "a",
          "text": "The transaction isolation problem, solved by locking categories."
        },
        {
          "id": "b",
          "text": "The Top-N problem, solved with ranking within partitions."
        },
        {
          "id": "c",
          "text": "The moving-average problem, solved by averaging prices."
        },
        {
          "id": "d",
          "text": "The Gap & Island problem, solved by finding missing dates."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Top-N uses a ranking function within each category, with category defining the partition and score defining descending order.",
      "source": "/references/database-window-functions-slides.pdf#page=6",
      "topic": "LO01: Motivation, use cases, and feature engineering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "Real-World Problems Solved by Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q003",
      "prompt": "A stock-price feature should average each observation with the previous six observations. Which technique matches the lecture’s moving-target example?",
      "options": [
        {
          "id": "a",
          "text": "A LAG() that returns only the immediately following price."
        },
        {
          "id": "b",
          "text": "A GROUP BY that outputs one total for the entire history."
        },
        {
          "id": "c",
          "text": "A window aggregate with a seven-row moving frame."
        },
        {
          "id": "d",
          "text": "A RANK() that assigns consecutive prices their positions."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lecture’s moving-target example applies AVG over the current row and six preceding rows, producing a rolling average of up to seven observations.",
      "source": "/references/database-window-functions-slides.pdf#page=6",
      "topic": "LO01: Motivation, use cases, and feature engineering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "Real-World Problems Solved by Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q004",
      "prompt": "For a churn-prediction dataset, which pair of timestamps is needed to construct the lecture’s days_diff feature for a rental?",
      "options": [
        {
          "id": "a",
          "text": "The current rental date and the previous rental date of the same customer."
        },
        {
          "id": "b",
          "text": "The current rental date and the latest date for all customers."
        },
        {
          "id": "c",
          "text": "The current rental date and the next film release date."
        },
        {
          "id": "d",
          "text": "The current rental date and the previous rental date of any customer."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The customer-behavior case study defines Δt as current rental date minus previous rental date, within each customer’s history.",
      "source": "/references/database-window-functions-slides.pdf#page=7",
      "topic": "LO01: Motivation, use cases, and feature engineering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Case Study: Customer Behavior Analysis"
        }
      ]
    },
    {
      "id": "db-s4-q005",
      "prompt": "A payment table has four payments from customer 7. What is the output shape of SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id for that customer?",
      "options": [
        {
          "id": "a",
          "text": "Four rows, each showing an accumulated running total."
        },
        {
          "id": "b",
          "text": "One row representing the total for customer 7."
        },
        {
          "id": "c",
          "text": "One row for every distinct payment amount."
        },
        {
          "id": "d",
          "text": "Four rows, each retaining its payment_id."
        }
      ],
      "correctOptionId": "b",
      "explanation": "GROUP BY collapses all payments belonging to one customer into a single group result.",
      "source": "/references/database-window-functions-slides.pdf#page=10",
      "topic": "LO02: Window functions versus GROUP BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "The Key Comparison: GROUP BY vs. Window"
        }
      ]
    },
    {
      "id": "db-s4-q006",
      "prompt": "A report must show each payment_id beside that customer’s overall spend. Which calculation meets both requirements?",
      "options": [
        {
          "id": "a",
          "text": "ROW_NUMBER() OVER (ORDER BY payment_id) only."
        },
        {
          "id": "b",
          "text": "SUM(amount) with GROUP BY customer_id as the only grouping."
        },
        {
          "id": "c",
          "text": "SUM(amount) OVER (PARTITION BY customer_id)."
        },
        {
          "id": "d",
          "text": "COUNT(*) with no OVER clause and no grouping."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The OVER clause produces a total per customer while preserving the original payment rows and their IDs.",
      "source": "/references/database-window-functions-slides.pdf#page=10",
      "topic": "LO02: Window functions versus GROUP BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "The Key Comparison: GROUP BY vs. Window"
        }
      ]
    },
    {
      "id": "db-s4-q007",
      "prompt": "Which statement best describes the set of rows considered by a window function?",
      "options": [
        {
          "id": "a",
          "text": "Only the final row remaining after GROUP BY."
        },
        {
          "id": "b",
          "text": "Always every row of every table in the database."
        },
        {
          "id": "c",
          "text": "Only newly inserted rows that have not been committed."
        },
        {
          "id": "d",
          "text": "Rows related to the current row, used to compute a value for that row."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The slide defines a window function as a calculation across table rows related to the current row.",
      "source": "/references/database-window-functions-slides.pdf#page=9",
      "topic": "LO02: Window functions versus GROUP BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 9,
          "slideNumber": 7,
          "slideTitle": "What is a Window Function?"
        }
      ]
    },
    {
      "id": "db-s4-q008",
      "prompt": "A manager wants each payment’s amount alongside the customer’s average payment amount. Why is a window aggregate preferable to grouping alone?",
      "options": [
        {
          "id": "a",
          "text": "It guarantees that every customer has exactly one payment."
        },
        {
          "id": "b",
          "text": "It updates the stored amount to the customer average."
        },
        {
          "id": "c",
          "text": "It automatically excludes payments below the customer average."
        },
        {
          "id": "d",
          "text": "It retains individual payment detail while adding the customer-level metric."
        }
      ],
      "correctOptionId": "d",
      "explanation": "A window AVG per customer can be displayed on each payment row; a grouped AVG by customer loses payment-level rows.",
      "source": "/references/database-window-functions-slides.pdf#page=10",
      "topic": "LO02: Window functions versus GROUP BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "The Key Comparison: GROUP BY vs. Window"
        }
      ]
    },
    {
      "id": "db-s4-q009",
      "prompt": "The payment table contains two customers with three and two transactions, respectively. No filters are applied. How many result rows will SELECT payment_id, SUM(amount) OVER (PARTITION BY customer_id) FROM payment return?",
      "options": [
        {
          "id": "a",
          "text": "2"
        },
        {
          "id": "b",
          "text": "1"
        },
        {
          "id": "c",
          "text": "3"
        },
        {
          "id": "d",
          "text": "5"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Window calculations preserve the five input payment rows; the partitioning changes the calculated value, not the number of rows.",
      "source": "/references/database-window-functions-slides.pdf#page=10",
      "topic": "LO02: Window functions versus GROUP BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "The Key Comparison: GROUP BY vs. Window"
        }
      ]
    },
    {
      "id": "db-s4-q010",
      "prompt": "Which clause marks a calculation as a window-function expression in the lecture syntax?",
      "options": [
        {
          "id": "a",
          "text": "WHERE ..."
        },
        {
          "id": "b",
          "text": "OVER (...)"
        },
        {
          "id": "c",
          "text": "GROUP BY ..."
        },
        {
          "id": "d",
          "text": "HAVING ..."
        }
      ],
      "correctOptionId": "b",
      "explanation": "A function such as SUM becomes a window calculation when it is followed by an OVER clause.",
      "source": "/references/database-window-functions-slides.pdf#page=11",
      "topic": "LO03: OVER, PARTITION BY, and ORDER BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Anatomy of the ”Window”"
        }
      ]
    },
    {
      "id": "db-s4-q011",
      "prompt": "When a running total is defined with PARTITION BY customer_id, what happens on the first payment belonging to a different customer?",
      "options": [
        {
          "id": "a",
          "text": "The two customers are merged into one output row."
        },
        {
          "id": "b",
          "text": "The query discards the new customer."
        },
        {
          "id": "c",
          "text": "The running calculation starts again for the new customer’s partition."
        },
        {
          "id": "d",
          "text": "The new customer inherits the preceding customer’s running total."
        }
      ],
      "correctOptionId": "c",
      "explanation": "PARTITION BY sets the scope: the window calculation resets independently for each customer.",
      "source": "/references/database-window-functions-slides.pdf#page=11",
      "topic": "LO03: OVER, PARTITION BY, and ORDER BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Anatomy of the ”Window”"
        }
      ]
    },
    {
      "id": "db-s4-q012",
      "prompt": "A ranking calculation has ORDER BY score DESC inside OVER (...) but no PARTITION BY. What scope does the ranking use?",
      "options": [
        {
          "id": "a",
          "text": "One partition for each column selected in SELECT."
        },
        {
          "id": "b",
          "text": "The complete set of input rows surviving earlier query stages."
        },
        {
          "id": "c",
          "text": "Only the first ten input rows, regardless of LIMIT."
        },
        {
          "id": "d",
          "text": "A separate partition for every score value."
        }
      ],
      "correctOptionId": "b",
      "explanation": "When PARTITION BY is omitted, the window operates on the available rows as a single partition.",
      "source": "/references/database-window-functions-slides.pdf#page=11",
      "topic": "LO03: OVER, PARTITION BY, and ORDER BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Anatomy of the ”Window”"
        }
      ]
    },
    {
      "id": "db-s4-q013",
      "prompt": "A query uses ROW_NUMBER() OVER (ORDER BY salary DESC) and ends with ORDER BY emp_name ASC. What determines the ROW_NUMBER() values?",
      "options": [
        {
          "id": "a",
          "text": "Alphabetical order if salary has no NULL values."
        },
        {
          "id": "b",
          "text": "The name ordering because the final sort recomputes row numbers."
        },
        {
          "id": "c",
          "text": "The physical heap order, regardless of OVER."
        },
        {
          "id": "d",
          "text": "The salary ordering inside the window, not the name order of displayed rows."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The internal window ORDER BY defines numbering; the final ORDER BY only controls presentation.",
      "source": "/references/database-window-functions-slides.pdf#page=20",
      "topic": "LO03: OVER, PARTITION BY, and ORDER BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "Why this specific position?"
        }
      ]
    },
    {
      "id": "db-s4-q014",
      "prompt": "In OVER (PARTITION BY dept ORDER BY salary DESC), what role does ORDER BY salary DESC play?",
      "options": [
        {
          "id": "a",
          "text": "It creates one output row for each department."
        },
        {
          "id": "b",
          "text": "It places the final result rows in salary order without a final ORDER BY."
        },
        {
          "id": "c",
          "text": "It specifies the sequence within each department."
        },
        {
          "id": "d",
          "text": "It filters out departments with low salaries."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The lecture separates scoping (PARTITION BY) from sequence (ORDER BY inside OVER).",
      "source": "/references/database-window-functions-slides.pdf#page=11",
      "topic": "LO03: OVER, PARTITION BY, and ORDER BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Anatomy of the ”Window”"
        }
      ]
    },
    {
      "id": "db-s4-q015",
      "prompt": "Match the three components of a window definition to their lecture roles. Which mapping is correct?",
      "options": [
        {
          "id": "a",
          "text": "PARTITION BY = sequence; ORDER BY = framing; ROWS/RANGE = scoping."
        },
        {
          "id": "b",
          "text": "PARTITION BY = scoping; ORDER BY = sequence; ROWS/RANGE = framing."
        },
        {
          "id": "c",
          "text": "PARTITION BY = row deletion; ORDER BY = grouping; ROWS/RANGE = joining."
        },
        {
          "id": "d",
          "text": "PARTITION BY = framing; ORDER BY = scoping; ROWS/RANGE = sequence."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The anatomy slide explicitly identifies these three distinct roles.",
      "source": "/references/database-window-functions-slides.pdf#page=11",
      "topic": "LO03: OVER, PARTITION BY, and ORDER BY",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 11,
          "slideNumber": 9,
          "slideTitle": "Anatomy of the ”Window”"
        }
      ]
    },
    {
      "id": "db-s4-q016",
      "prompt": "A customer’s chronologically ordered payment amounts are 5, 7, 2, and 9. What is the rolling three-payment SUM at the fourth payment with ROWS BETWEEN 2 PRECEDING AND CURRENT ROW?",
      "options": [
        {
          "id": "a",
          "text": "16"
        },
        {
          "id": "b",
          "text": "11"
        },
        {
          "id": "c",
          "text": "18"
        },
        {
          "id": "d",
          "text": "23"
        }
      ],
      "correctOptionId": "c",
      "explanation": "At the fourth payment, the frame includes amounts 7, 2, and 9, so the sum is 18.",
      "source": "/references/database-window-functions-slides.pdf#page=12",
      "topic": "LO04: Frames and sliding windows",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Visualizing ”Looking Around” (Sliding Window)"
        }
      ]
    },
    {
      "id": "db-s4-q017",
      "prompt": "For ordered payment amounts 2, 4, 8, what is the rolling three-payment total at the second payment?",
      "options": [
        {
          "id": "a",
          "text": "4"
        },
        {
          "id": "b",
          "text": "14"
        },
        {
          "id": "c",
          "text": "8"
        },
        {
          "id": "d",
          "text": "6"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Only the first and second rows are available at the second payment; their total is 2 + 4 = 6.",
      "source": "/references/database-window-functions-slides.pdf#page=12",
      "topic": "LO04: Frames and sliding windows",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Visualizing ”Looking Around” (Sliding Window)"
        }
      ]
    },
    {
      "id": "db-s4-q018",
      "prompt": "Which frame specification implements the lecture’s moving average over the current observation and the previous six observations?",
      "options": [
        {
          "id": "a",
          "text": "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW"
        },
        {
          "id": "b",
          "text": "ROWS BETWEEN 6 PRECEDING AND 1 PRECEDING"
        },
        {
          "id": "c",
          "text": "ROWS BETWEEN CURRENT ROW AND 6 FOLLOWING"
        },
        {
          "id": "d",
          "text": "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Six preceding rows plus the current row yield up to seven observations, matching the example.",
      "source": "/references/database-window-functions-slides.pdf#page=6",
      "topic": "LO04: Frames and sliding windows",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "Real-World Problems Solved by Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q019",
      "prompt": "For a payment stream with distinct chronological positions, how does ROWS BETWEEN 1 PRECEDING AND CURRENT ROW differ from the lecture’s three-payment frame?",
      "options": [
        {
          "id": "a",
          "text": "It includes all payments by that customer."
        },
        {
          "id": "b",
          "text": "It includes the next payment rather than the preceding payment."
        },
        {
          "id": "c",
          "text": "It averages payments instead of summing them."
        },
        {
          "id": "d",
          "text": "It includes at most two payment rows rather than three."
        }
      ],
      "correctOptionId": "d",
      "explanation": "A ROWS frame ending at CURRENT ROW includes the stated number of preceding rows plus the current row.",
      "source": "/references/database-window-functions-slides.pdf#page=12",
      "topic": "LO04: Frames and sliding windows",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Visualizing ”Looking Around” (Sliding Window)"
        }
      ]
    },
    {
      "id": "db-s4-q020",
      "prompt": "The lab requires a rolling total of payments for each customer. Why must the calculation include both PARTITION BY customer_id and chronological ORDER BY payment_date?",
      "options": [
        {
          "id": "a",
          "text": "The partition sorts payments and the ordering joins customers."
        },
        {
          "id": "b",
          "text": "The partition separates customers while the ordering identifies preceding payments."
        },
        {
          "id": "c",
          "text": "The ordering alone guarantees customers cannot affect one another."
        },
        {
          "id": "d",
          "text": "Both clauses remove duplicate payment amounts."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Scoping and ordering solve different parts of the sliding-window task.",
      "source": "/references/database-window-functions-slides.pdf#page=12",
      "topic": "LO04: Frames and sliding windows",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Visualizing ”Looking Around” (Sliding Window)"
        }
      ]
    },
    {
      "id": "db-s4-q021",
      "prompt": "Customer A has just one payment of 12, while customer B has many payments. Under a three-payment SUM frame partitioned by customer, what is A’s rolling total?",
      "options": [
        {
          "id": "a",
          "text": "0"
        },
        {
          "id": "b",
          "text": "36"
        },
        {
          "id": "c",
          "text": "12"
        },
        {
          "id": "d",
          "text": "The sum of the last two payments by customer B."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The frame cannot reach rows from another customer; for a one-row partition it includes only that row.",
      "source": "/references/database-window-functions-slides.pdf#page=12",
      "topic": "LO04: Frames and sliding windows",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 12,
          "slideNumber": 10,
          "slideTitle": "Visualizing ”Looking Around” (Sliding Window)"
        }
      ]
    },
    {
      "id": "db-s4-q022",
      "prompt": "Films have distinct lengths of 140, 100, and 125 minutes. What ROW_NUMBER is assigned to the 125-minute film under ORDER BY length DESC?",
      "options": [
        {
          "id": "a",
          "text": "125"
        },
        {
          "id": "b",
          "text": "1"
        },
        {
          "id": "c",
          "text": "2"
        },
        {
          "id": "d",
          "text": "3"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Descending order is 140, 125, then 100; unique positions are 1, 2, and 3.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q023",
      "prompt": "Two films have identical length and the window ORDER BY specifies only length. What can be guaranteed about their ROW_NUMBER values?",
      "options": [
        {
          "id": "a",
          "text": "They are different, but which film gets the smaller number is not specified."
        },
        {
          "id": "b",
          "text": "Both receive the rank of the next non-tied row."
        },
        {
          "id": "c",
          "text": "They must receive the same row number."
        },
        {
          "id": "d",
          "text": "Both are automatically removed from the result."
        }
      ],
      "correctOptionId": "a",
      "explanation": "ROW_NUMBER assigns distinct consecutive integers, but ties need an additional order key for predictable assignment.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q024",
      "prompt": "Descending scores are 90, 90, 80, 80, 70. What is the RANK of the score 70?",
      "options": [
        {
          "id": "a",
          "text": "5"
        },
        {
          "id": "b",
          "text": "2"
        },
        {
          "id": "c",
          "text": "3"
        },
        {
          "id": "d",
          "text": "4"
        }
      ],
      "correctOptionId": "a",
      "explanation": "RANK gives the tied 90s rank 1, the tied 80s rank 3, and the 70 rank 5.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q025",
      "prompt": "Scores in Department A are 90 and 80; scores in Department B are 100, 100, and 75. Under DENSE_RANK() OVER (PARTITION BY dept ORDER BY score DESC), what is the rank of Department B’s 75?",
      "options": [
        {
          "id": "a",
          "text": "2"
        },
        {
          "id": "b",
          "text": "4"
        },
        {
          "id": "c",
          "text": "3"
        },
        {
          "id": "d",
          "text": "1"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Within Department B, the tied 100s occupy the first distinct-score tier and 75 occupies the second; Department A is a separate partition.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q026",
      "prompt": "For an employee leaderboard, which function gives equal ranks for salary ties without leaving gaps in rank numbers?",
      "options": [
        {
          "id": "a",
          "text": "COUNT()"
        },
        {
          "id": "b",
          "text": "RANK()"
        },
        {
          "id": "c",
          "text": "DENSE_RANK()"
        },
        {
          "id": "d",
          "text": "ROW_NUMBER()"
        }
      ],
      "correctOptionId": "c",
      "explanation": "DENSE_RANK assigns the same number to peers and advances by one for the next distinct value.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q027",
      "prompt": "A department must nominate exactly one employee with the largest salary, even if salaries tie. Which ranking approach best matches this row-count requirement?",
      "options": [
        {
          "id": "a",
          "text": "Use DENSE_RANK and keep ranks at most 2."
        },
        {
          "id": "b",
          "text": "Use ROW_NUMBER ordered by descending salary, then keep row number 1."
        },
        {
          "id": "c",
          "text": "Use RANK and keep all rows with rank 1."
        },
        {
          "id": "d",
          "text": "Use COUNT over the department and keep count 1."
        }
      ],
      "correctOptionId": "b",
      "explanation": "ROW_NUMBER gives exactly one row position 1 per nonempty partition; a deterministic tie-breaker can specify which tied person wins.",
      "source": "/references/database-window-functions-slides.pdf#page=6",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "Real-World Problems Solved by Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q028",
      "prompt": "Three films in one category have lengths 150, 150, and 140. Filtering on DENSE_RANK() <= 2 after computing ranks returns how many films?",
      "options": [
        {
          "id": "a",
          "text": "1"
        },
        {
          "id": "b",
          "text": "2"
        },
        {
          "id": "c",
          "text": "3"
        },
        {
          "id": "d",
          "text": "0"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Both 150-minute films have dense rank 1 and the 140-minute film has dense rank 2, so all three qualify.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q029",
      "prompt": "How can a ranking query make ROW_NUMBER assignment predictable when multiple films share the same length?",
      "options": [
        {
          "id": "a",
          "text": "Add a unique tie-breaker such as film_id after length in the window ORDER BY."
        },
        {
          "id": "b",
          "text": "Remove ORDER BY from OVER."
        },
        {
          "id": "c",
          "text": "Switch to GROUP BY length before numbering without preserving films."
        },
        {
          "id": "d",
          "text": "Add a final LIMIT but leave the window ORDER BY unchanged."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The slide recommends additional ORDER BY columns to make arbitrary tie ordering stable.",
      "source": "/references/database-window-functions-slides.pdf#page=15",
      "topic": "LO05: Ranking functions and ties",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 15,
          "slideNumber": 12,
          "slideTitle": "Ranking Functions: Handling Ties"
        }
      ]
    },
    {
      "id": "db-s4-q030",
      "prompt": "Customer 1 has payments of 4, 6, and 2. What value does each row show for SUM(amount) OVER (PARTITION BY customer_id)?",
      "options": [
        {
          "id": "a",
          "text": "12"
        },
        {
          "id": "b",
          "text": "3"
        },
        {
          "id": "c",
          "text": "4, then 10, then 12"
        },
        {
          "id": "d",
          "text": "4, then 6, then 2"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Without an ordering inside OVER, every row receives the customer’s fixed total: 4 + 6 + 2 = 12.",
      "source": "/references/database-window-functions-slides.pdf#page=16",
      "topic": "LO06: Aggregate window functions",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "Aggregate Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q031",
      "prompt": "With distinct chronological payment timestamps, customer 2 pays 8, then 3, then 4. What running total appears on the second payment?",
      "options": [
        {
          "id": "a",
          "text": "3"
        },
        {
          "id": "b",
          "text": "8"
        },
        {
          "id": "c",
          "text": "11"
        },
        {
          "id": "d",
          "text": "15"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The cumulative metric includes the first payment and the second payment, so 8 + 3 = 11.",
      "source": "/references/database-window-functions-slides.pdf#page=16",
      "topic": "LO06: Aggregate window functions",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "Aggregate Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q032",
      "prompt": "A report needs the number of payments made by each customer, displayed on every payment row. Which expression fits?",
      "options": [
        {
          "id": "a",
          "text": "COUNT(*) OVER (PARTITION BY customer_id)"
        },
        {
          "id": "b",
          "text": "ROW_NUMBER() OVER (ORDER BY amount)"
        },
        {
          "id": "c",
          "text": "LAG(amount, 1) OVER (PARTITION BY customer_id)"
        },
        {
          "id": "d",
          "text": "COUNT(*) GROUP BY customer_id inserted directly into the SELECT list."
        }
      ],
      "correctOptionId": "a",
      "explanation": "COUNT is listed among window aggregates; OVER(PARTITION BY ...) retains every payment while showing group size.",
      "source": "/references/database-window-functions-slides.pdf#page=14",
      "topic": "LO06: Aggregate window functions",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "Main Categories of Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q033",
      "prompt": "Which expression would allow a report to compare each individual payment with the same customer’s mean payment?",
      "options": [
        {
          "id": "a",
          "text": "AVG(amount) OVER (PARTITION BY payment_id)"
        },
        {
          "id": "b",
          "text": "SUM(amount) GROUP BY customer_id without preserving individual rows."
        },
        {
          "id": "c",
          "text": "RANK() OVER (ORDER BY amount)"
        },
        {
          "id": "d",
          "text": "AVG(amount) OVER (PARTITION BY customer_id)"
        }
      ],
      "correctOptionId": "d",
      "explanation": "A customer partition gives the same average across that customer’s rows, so an individual amount can be compared with the mean.",
      "source": "/references/database-window-functions-slides.pdf#page=10",
      "topic": "LO06: Aggregate window functions",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 10,
          "slideNumber": 8,
          "slideTitle": "The Key Comparison: GROUP BY vs. Window"
        }
      ]
    },
    {
      "id": "db-s4-q034",
      "prompt": "Which pair consists entirely of standard aggregate functions explicitly listed as usable window functions in the lecture?",
      "options": [
        {
          "id": "a",
          "text": "LAG() and LEAD()"
        },
        {
          "id": "b",
          "text": "ROW_NUMBER() and FIRST_VALUE()"
        },
        {
          "id": "c",
          "text": "RANK() and COUNT()"
        },
        {
          "id": "d",
          "text": "MIN() and MAX()"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The aggregate window-function category lists SUM, AVG, COUNT, MIN, and MAX; the other options mix categories.",
      "source": "/references/database-window-functions-slides.pdf#page=14",
      "topic": "LO06: Aggregate window functions",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 14,
          "slideNumber": 11,
          "slideTitle": "Main Categories of Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q035",
      "prompt": "Customer A pays 2 and 3, and customer B pays 10 and 4. With a running SUM partitioned by customer and ordered chronologically, what appears on B’s first payment?",
      "options": [
        {
          "id": "a",
          "text": "19"
        },
        {
          "id": "b",
          "text": "5"
        },
        {
          "id": "c",
          "text": "15"
        },
        {
          "id": "d",
          "text": "10"
        }
      ],
      "correctOptionId": "d",
      "explanation": "A new customer partition starts a new cumulative total, so B’s first row reflects only B’s payment of 10.",
      "source": "/references/database-window-functions-slides.pdf#page=16",
      "topic": "LO06: Aggregate window functions",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 16,
          "slideNumber": 13,
          "slideTitle": "Aggregate Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q036",
      "prompt": "For a customer’s payments ordered 10, 20, 30, 40, what is LAG(amount, 2) at the fourth payment?",
      "options": [
        {
          "id": "a",
          "text": "30"
        },
        {
          "id": "b",
          "text": "20"
        },
        {
          "id": "c",
          "text": "10"
        },
        {
          "id": "d",
          "text": "40"
        }
      ],
      "correctOptionId": "b",
      "explanation": "LAG(amount, 2) reads two positions backwards: from row four to row two, whose amount is 20.",
      "source": "/references/database-window-functions-slides.pdf#page=17",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Value (Offset) Functions"
        }
      ]
    },
    {
      "id": "db-s4-q037",
      "prompt": "A retention analyst wants the date of each customer’s next rental for every current rental. Which function direction is appropriate?",
      "options": [
        {
          "id": "a",
          "text": "RANK() with no ordering."
        },
        {
          "id": "b",
          "text": "SUM(rental_date) without a window."
        },
        {
          "id": "c",
          "text": "LAG(rental_date, 1) within a customer-ordered window."
        },
        {
          "id": "d",
          "text": "LEAD(rental_date, 1) within a customer-ordered window."
        }
      ],
      "correctOptionId": "d",
      "explanation": "LEAD accesses a later row in the specified sequence; partitioning by customer keeps histories separate.",
      "source": "/references/database-window-functions-slides.pdf#page=17",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Value (Offset) Functions"
        }
      ]
    },
    {
      "id": "db-s4-q038",
      "prompt": "Consecutive payments by one customer are 10 and 15. What is amount - LAG(amount, 1) at the second payment?",
      "options": [
        {
          "id": "a",
          "text": "15"
        },
        {
          "id": "b",
          "text": "-5"
        },
        {
          "id": "c",
          "text": "25"
        },
        {
          "id": "d",
          "text": "5"
        }
      ],
      "correctOptionId": "d",
      "explanation": "At the second row, LAG retrieves the earlier amount of 10, so the difference is 15 - 10 = 5.",
      "source": "/references/database-window-functions-slides.pdf#page=17",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Value (Offset) Functions"
        }
      ]
    },
    {
      "id": "db-s4-q039",
      "prompt": "A customer rents on 2 March and again on 7 March of the same year, with no rental between. What days_diff does the case study define for the second rental?",
      "options": [
        {
          "id": "a",
          "text": "7 days"
        },
        {
          "id": "b",
          "text": "9 days"
        },
        {
          "id": "c",
          "text": "2 days"
        },
        {
          "id": "d",
          "text": "5 days"
        }
      ],
      "correctOptionId": "d",
      "explanation": "The case-study feature is current date minus previous date for the same customer: 7 - 2 = 5 days.",
      "source": "/references/database-window-functions-slides.pdf#page=7",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 7,
          "slideNumber": 6,
          "slideTitle": "Case Study: Customer Behavior Analysis"
        }
      ]
    },
    {
      "id": "db-s4-q040",
      "prompt": "A report needs the amount of the earliest payment in each customer’s chronological history. Which listed value function is most appropriate?",
      "options": [
        {
          "id": "a",
          "text": "COUNT(amount) over the same window."
        },
        {
          "id": "b",
          "text": "FIRST_VALUE(amount) over a window ordered by payment_date."
        },
        {
          "id": "c",
          "text": "RANK() ordered by amount only."
        },
        {
          "id": "d",
          "text": "LEAD(amount, 1) over the same window."
        }
      ],
      "correctOptionId": "b",
      "explanation": "FIRST_VALUE returns the first value in the defined ordered window; the sort key specifies earliest payment.",
      "source": "/references/database-window-functions-slides.pdf#page=17",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Value (Offset) Functions"
        }
      ]
    },
    {
      "id": "db-s4-q041",
      "prompt": "Which value function in the lecture is associated with retrieving the last value of a defined window frame?",
      "options": [
        {
          "id": "a",
          "text": "AVG()"
        },
        {
          "id": "b",
          "text": "ROW_NUMBER()"
        },
        {
          "id": "c",
          "text": "LAST_VALUE()"
        },
        {
          "id": "d",
          "text": "RANK()"
        }
      ],
      "correctOptionId": "c",
      "explanation": "The value-function slide names FIRST_VALUE and LAST_VALUE. The result is determined by the applicable window frame, so a frame should be specified when a particular last row is required.",
      "source": "/references/database-window-functions-slides.pdf#page=17",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 17,
          "slideNumber": 14,
          "slideTitle": "Value (Offset) Functions"
        }
      ]
    },
    {
      "id": "db-s4-q042",
      "prompt": "A product team wants to distinguish continuous daily activity from gaps between user sessions. Which lecture technique is most relevant?",
      "options": [
        {
          "id": "a",
          "text": "Use an index to make the missing timestamps appear."
        },
        {
          "id": "b",
          "text": "Use GROUP BY to remove every period with inactivity."
        },
        {
          "id": "c",
          "text": "Use LAG or LEAD to compare neighboring activity observations."
        },
        {
          "id": "d",
          "text": "Use SUM without an ORDER BY to change every session timestamp."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The Gap & Island example uses neighboring-row values to detect state changes and gaps.",
      "source": "/references/database-window-functions-slides.pdf#page=6",
      "topic": "LO07: Value/offset functions and time series",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 6,
          "slideNumber": 5,
          "slideTitle": "Real-World Problems Solved by Window Functions"
        }
      ]
    },
    {
      "id": "db-s4-q043",
      "prompt": "A query filters employees with WHERE salary > 1000 and then applies RANK() OVER (ORDER BY salary DESC). Who receives ranks?",
      "options": [
        {
          "id": "a",
          "text": "Only employees whose rows survived the salary filter."
        },
        {
          "id": "b",
          "text": "Only employees added after the final ORDER BY."
        },
        {
          "id": "c",
          "text": "All employees, including those excluded by WHERE."
        },
        {
          "id": "d",
          "text": "Only employees whose rank is 1."
        }
      ],
      "correctOptionId": "a",
      "explanation": "WHERE executes before window functions, so filtered-out employees are invisible to the ranking calculation.",
      "source": "/references/database-window-functions-slides.pdf#page=20",
      "topic": "LO08: Logical execution order and CTE filtering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 20,
          "slideNumber": 17,
          "slideTitle": "Why this specific position?"
        }
      ]
    },
    {
      "id": "db-s4-q044",
      "prompt": "Which stage immediately precedes WINDOW FUNCTIONS in the simplified execution pipeline on the lecture slide?",
      "options": [
        {
          "id": "a",
          "text": "DISTINCT"
        },
        {
          "id": "b",
          "text": "HAVING"
        },
        {
          "id": "c",
          "text": "LIMIT / OFFSET"
        },
        {
          "id": "d",
          "text": "ORDER BY"
        }
      ],
      "correctOptionId": "b",
      "explanation": "The shown sequence is FROM/JOIN, WHERE, GROUP BY, HAVING, WINDOW FUNCTIONS, SELECT, DISTINCT, ORDER BY, LIMIT/OFFSET.",
      "source": "/references/database-window-functions-slides.pdf#page=19",
      "topic": "LO08: Logical execution order and CTE filtering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "The Complete Execution Pipeline"
        }
      ]
    },
    {
      "id": "db-s4-q045",
      "prompt": "Why is SELECT * FROM employees WHERE ROW_NUMBER() OVER (ORDER BY salary) = 1 invalid?",
      "options": [
        {
          "id": "a",
          "text": "Window functions cannot order by numeric columns."
        },
        {
          "id": "b",
          "text": "ROW_NUMBER requires GROUP BY in every query."
        },
        {
          "id": "c",
          "text": "WHERE must always be placed after ORDER BY."
        },
        {
          "id": "d",
          "text": "The window result is not available at the time WHERE is evaluated."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lecture explains that filtering by a window result requires an outer query block.",
      "source": "/references/database-window-functions-slides.pdf#page=18",
      "topic": "LO08: Logical execution order and CTE filtering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 18,
          "slideNumber": 15,
          "slideTitle": "Logical Order of Execution (Critical)"
        }
      ]
    },
    {
      "id": "db-s4-q046",
      "prompt": "A CTE computes ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn. Where should the predicate rn = 1 be applied?",
      "options": [
        {
          "id": "a",
          "text": "In an outer SELECT that reads the CTE."
        },
        {
          "id": "b",
          "text": "Inside the CTE’s WHERE clause before the window value is computed."
        },
        {
          "id": "c",
          "text": "In a HAVING clause of the same SELECT without aggregation."
        },
        {
          "id": "d",
          "text": "In the window’s ORDER BY expression as a Boolean predicate."
        }
      ],
      "correctOptionId": "a",
      "explanation": "A CTE or subquery allows the window result to exist before the outer WHERE filters it.",
      "source": "/references/database-window-functions-slides.pdf#page=18",
      "topic": "LO08: Logical execution order and CTE filtering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 18,
          "slideNumber": 15,
          "slideTitle": "Logical Order of Execution (Critical)"
        }
      ]
    },
    {
      "id": "db-s4-q047",
      "prompt": "A query uses a window calculation and then LIMIT 5. Which statement follows from the lecture’s logical pipeline?",
      "options": [
        {
          "id": "a",
          "text": "The window function is automatically re-run on the five remaining rows."
        },
        {
          "id": "b",
          "text": "The window values are computed before the final LIMIT reduces the displayed rows."
        },
        {
          "id": "c",
          "text": "The limit changes PARTITION BY into GROUP BY."
        },
        {
          "id": "d",
          "text": "LIMIT is applied first, so the window sees only five source rows."
        }
      ],
      "correctOptionId": "b",
      "explanation": "The lecture positions window functions before final ORDER BY and LIMIT/OFFSET, so LIMIT does not restrict the window input in that same query block.",
      "source": "/references/database-window-functions-slides.pdf#page=19",
      "topic": "LO08: Logical execution order and CTE filtering",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 19,
          "slideNumber": 16,
          "slideTitle": "The Complete Execution Pipeline"
        }
      ]
    },
    {
      "id": "db-s4-q048",
      "prompt": "In Film Ranking Lab 1, which three tables must be joined to assign each film to a category and rank its length?",
      "options": [
        {
          "id": "a",
          "text": "film, film_category, and category."
        },
        {
          "id": "b",
          "text": "rental, address, and country."
        },
        {
          "id": "c",
          "text": "staff, payment, and city."
        },
        {
          "id": "d",
          "text": "film, payment, and customer."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Lab 1 explicitly requires joining film to category through film_category before ranking within each category.",
      "source": "/references/database-window-functions-slides.pdf#page=22",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lab 1: Film Ranking (The Basics)"
        }
      ]
    },
    {
      "id": "db-s4-q049",
      "prompt": "After a join has produced the columns category_name and length, which expression ranks longer films first within each category as Lab 1 requests?",
      "options": [
        {
          "id": "a",
          "text": "DENSE_RANK() OVER (PARTITION BY category_name ORDER BY length DESC)"
        },
        {
          "id": "b",
          "text": "DENSE_RANK() OVER (ORDER BY category_name, length ASC)"
        },
        {
          "id": "c",
          "text": "ROW_NUMBER() OVER (PARTITION BY length ORDER BY category_name)"
        },
        {
          "id": "d",
          "text": "SUM(length) OVER (PARTITION BY category_name)"
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lab specifically uses DENSE_RANK, category-based partitions, and descending film length; category_name denotes the available category-name column or alias.",
      "source": "/references/database-window-functions-slides.pdf#page=22",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lab 1: Film Ranking (The Basics)"
        }
      ]
    },
    {
      "id": "db-s4-q050",
      "prompt": "Why is an outer query with length_rank <= 3 more appropriate than a global LIMIT 3 for Lab 1?",
      "options": [
        {
          "id": "a",
          "text": "It removes films with tied lengths before calculating ranks."
        },
        {
          "id": "b",
          "text": "It changes the category join into an aggregation."
        },
        {
          "id": "c",
          "text": "It selects the qualifying ranked films within every category, rather than three rows total."
        },
        {
          "id": "d",
          "text": "It makes DENSE_RANK return a new value on each row."
        }
      ],
      "correctOptionId": "c",
      "explanation": "A Top-N-per-group condition is applied to a rank already calculated for each category; global LIMIT is not equivalent.",
      "source": "/references/database-window-functions-slides.pdf#page=22",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 22,
          "slideNumber": 19,
          "slideTitle": "Lab 1: Film Ranking (The Basics)"
        }
      ]
    },
    {
      "id": "db-s4-q051",
      "prompt": "What is the correct sequence of main operations for the lecture’s Month-over-Month (MoM) Growth Lab?",
      "options": [
        {
          "id": "a",
          "text": "Rank individual payments, remove all but rank 1, then average film lengths."
        },
        {
          "id": "b",
          "text": "Aggregate revenue by month using DATE_TRUNC, retrieve previous monthly revenue with LAG, then compute growth percent."
        },
        {
          "id": "c",
          "text": "Use LEAD to obtain the next film length, then sum by film category."
        },
        {
          "id": "d",
          "text": "Compute growth on each ungrouped payment before identifying its month."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Lab 2 first forms monthly revenue totals in a CTE, then uses LAG on that monthly series and applies the stated formula.",
      "source": "/references/database-window-functions-slides.pdf#page=23",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Lab 2: Growth Analysis (Time Series)"
        }
      ]
    },
    {
      "id": "db-s4-q052",
      "prompt": "Monthly revenue increases from 100 to 125. According to the Lab 2 formula, what is the MoM growth rate?",
      "options": [
        {
          "id": "a",
          "text": "5%"
        },
        {
          "id": "b",
          "text": "25%"
        },
        {
          "id": "c",
          "text": "125%"
        },
        {
          "id": "d",
          "text": "20%"
        }
      ],
      "correctOptionId": "b",
      "explanation": "MoM growth = (Current - Previous) / Previous × 100 = (125 - 100) / 100 × 100 = 25%.",
      "source": "/references/database-window-functions-slides.pdf#page=23",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Lab 2: Growth Analysis (Time Series)"
        }
      ]
    },
    {
      "id": "db-s4-q053",
      "prompt": "An analyst calculates MoM growth as (Current - Previous) / Current × 100 rather than using the lecture’s formula. What is the mistake?",
      "options": [
        {
          "id": "a",
          "text": "The denominator should be the previous month’s revenue, not the current month’s revenue."
        },
        {
          "id": "b",
          "text": "The numerator should always be the sum of both months’ revenue."
        },
        {
          "id": "c",
          "text": "The expression should compare current revenue with the next month."
        },
        {
          "id": "d",
          "text": "The result should be multiplied by 10 instead of 100."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture defines MoM growth as (Current - Previous) / Previous × 100; the preceding month is the percentage-change baseline.",
      "source": "/references/database-window-functions-slides.pdf#page=23",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 23,
          "slideNumber": 20,
          "slideTitle": "Lab 2: Growth Analysis (Time Series)"
        }
      ]
    },
    {
      "id": "db-s4-q054",
      "prompt": "For Lab 4, a per-country Top 1 highest-spending customer report must derive country and spend. Which plan is consistent with the learning task?",
      "options": [
        {
          "id": "a",
          "text": "Choose the single highest-spending customer worldwide with a global LIMIT 1."
        },
        {
          "id": "b",
          "text": "Apply RANK directly inside WHERE before aggregating spending."
        },
        {
          "id": "c",
          "text": "Rank individual country names before associating any payments."
        },
        {
          "id": "d",
          "text": "Join customers to their location and payment data, aggregate spend per customer and country, rank within country, then filter rank 1 outside."
        }
      ],
      "correctOptionId": "d",
      "explanation": "The lab requires aggregation by customer and country, then a country-partitioned RANK in a CTE. In the DVD Rental schema, payment data is also needed to derive actual spending.",
      "source": "/references/database-window-functions-slides.pdf#page=25",
      "topic": "LO09: Integrated applications: four labs",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 25,
          "slideNumber": 22,
          "slideTitle": "Lab 4: The ”Top-N” Filter Challenge"
        }
      ]
    },
    {
      "id": "db-s4-q055",
      "prompt": "A checkout service needs to protect a stock-update transaction from concurrent writers. Is a window function the appropriate mechanism?",
      "options": [
        {
          "id": "a",
          "text": "Yes; SUM OVER commits a transaction when it finishes."
        },
        {
          "id": "b",
          "text": "Yes; RANK automatically locks all conflicting stock rows."
        },
        {
          "id": "c",
          "text": "No; locking and transaction control are outside the window-function domain."
        },
        {
          "id": "d",
          "text": "Yes; LAG makes every update atomic."
        }
      ],
      "correctOptionId": "c",
      "explanation": "The limits slide explicitly separates read-only window analytics from concurrency control and ACID properties.",
      "source": "/references/database-window-functions-slides.pdf#page=21",
      "topic": "LO10: Scope and limitations",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "What Window Functions are NOT"
        }
      ]
    },
    {
      "id": "db-s4-q056",
      "prompt": "A developer claims a window function replaces the need to index a large payment table. Which response matches the lecture?",
      "options": [
        {
          "id": "a",
          "text": "The claim is incorrect: window functions do not replace indexing."
        },
        {
          "id": "b",
          "text": "The claim is correct because window functions rewrite the physical heap."
        },
        {
          "id": "c",
          "text": "The claim is correct whenever ORDER BY is present inside OVER."
        },
        {
          "id": "d",
          "text": "The claim is correct if the window function uses SUM rather than AVG."
        }
      ],
      "correctOptionId": "a",
      "explanation": "The lecture says window functions are not a replacement for indexing; they compute analytic values rather than changing the storage or index structures.",
      "source": "/references/database-window-functions-slides.pdf#page=21",
      "topic": "LO10: Scope and limitations",
      "sources": [
        {
          "kind": "lecture",
          "file": "AdvanceDatabases4.pdf",
          "pdfPage": 21,
          "slideNumber": 18,
          "slideTitle": "What Window Functions are NOT"
        }
      ]
    }
  ]
};
