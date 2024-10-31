using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_protasker.Migrations
{
    /// <inheritdoc />
    public partial class createnewvalidationattribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StatutId",
                table: "Tache",
                newName: "Statut");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Statut",
                table: "Tache",
                newName: "StatutId");
        }
    }
}
