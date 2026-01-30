CREATE TABLE IF NOT EXISTS books (
    barcode VARCHAR(50) PRIMARY KEY,
    call_number VARCHAR(50),
    bookshelf_number VARCHAR(50),
    last_scanned TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS weeding_list (
    barcode VARCHAR(50) PRIMARY KEY,
    reason TEXT
);

-- Seed some data for testing
INSERT INTO weeding_list (barcode, reason) VALUES ('9780123456789', 'Damaged');