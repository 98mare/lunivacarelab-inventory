export const newTableStyles = `
<style>
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
}
table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-spacing: 0;
    border-collapse: collapse;
}
thead > tr > th, tbody > tr > td {
    padding: 16px 16px;
    overflow-wrap: break-word;
}
thead > tr > th {
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    text-align: left;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
}
tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s;
}
thead > tr> th:first-child, tbody > tr > td:first-child{
    display: none;
}

.gocenter {
    text-align: center;
}
.headingContent{
    display: flex;
    justify-content: space-between;
  }
</style>
`;