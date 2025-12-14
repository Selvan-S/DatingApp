using API.Controllers;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext context) : BaseApiController
{

    [HttpGet] // GET api/users
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return Ok(users);
    }

    [Authorize]
    [HttpGet("{id}")] // GET api/users/5
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUser(string id)
    {
        var user = await context.Users.FindAsync(id);

        if (user == null) return NotFound("User not found");

        return Ok(user);
    }
}
