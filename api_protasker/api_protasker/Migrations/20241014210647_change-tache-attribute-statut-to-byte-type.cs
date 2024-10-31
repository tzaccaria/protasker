using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_protasker.Migrations
{
    /// <inheritdoc />
    public partial class changetacheattributestatuttobytetype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Statut",
                table: "Tache");

            migrationBuilder.AddColumn<byte>(
                name: "StatutId",
                table: "Tache",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatutId",
                table: "Tache");

            migrationBuilder.AddColumn<int>(
                name: "Statut",
                table: "Tache",
                type: "int",
                maxLength: 255,
                nullable: false,
                defaultValue: 0);
        }
    }
}
